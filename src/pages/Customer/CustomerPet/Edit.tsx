import { motion } from "framer-motion";
import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useReducer,
  useState,
} from "react";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import FilterInput from "../../../containers/Filter/FilterInput";
import {
  petLists,
  ageLists,
  sexLists,
  foodLists,
  serviceLists,
  facilitiesLists,
  specialsLists,
} from "../../../containers/Filter/data";
import MotionFade from "../../../containers/MotionFade";
import MotionPopup from "../../../containers/MotionPopup";
import useModal from "../../../hooks/useModal";
import UploadImage from "../../../components/UploadImage";
import { xPath } from "../../../img/icons";
import {
  assertIsError,
  toFormData,
  AxiosTryCatch,
  tryCatch,
} from "../../../utils";
import { uploadRoomPhoto, putRoom, postRoom } from "../../../utils/api/cmsRoom";
import UserAuth from "../../../context/UserAuthContext";
import {
  Pet,
  PetList,
  PetSchema,
  POSTRoom,
  PostRoomSchema,
  Room,
} from "../../../types/schema";
import { PendingAction } from "../../../hooks/usePending";
import Input from "./Input";
import { input, filterInput } from "./data";
import { InitPet, initPet, PetAction, petReducer } from "./petReducer";
import Button from "../../../components/Button";
import { postPet, postPetPhoto, putPet } from "../../../utils/api/petCard";

interface IEditProps {
  onClick: () => void;
  title: string;
  type: "POST" | "PUT";
  data?: PetList[0];
}

const handleRequest = async (
  type: "POST" | "PUT",
  body: Pet,
  token: string,
  closeModal: (time: number) => NodeJS.Timeout,
  dispatchPending: React.Dispatch<PendingAction>,
  id?: number,
  formdata?: FormData
): Promise<boolean | string | undefined> => {
  // console.log(type);

  if (type === "POST") {
    const petResult = await postPet(body, token);
    if (petResult === undefined) {
      dispatchPending({
        type: "IS_ERROR",
        payload: "系統錯誤，請重新再試",
      });
      closeModal(1000);
      return false;
    }
    if (formdata !== undefined) {
      const photoResult = await postPetPhoto(petResult.petid, formdata, token);
      if (photoResult === undefined) {
        dispatchPending({
          type: "IS_ERROR",
          payload: "上傳寵物照片錯誤，請稍後再試",
        });
        closeModal(1000);
      }
    }
    return true;
  }

  if (type === "PUT" && id !== undefined) {
    console.log(body);
    const result = await putPet(id, body, token);
    if (result === undefined) return false;

    if (formdata !== undefined) {
      await postPetPhoto(id, formdata, token);
    }
    return true;
  }
  return false;
};

const validatePet = (
  pet: Pet,
  petList: PetList,
  type: "POST" | "PUT",
  dispatchPending: React.Dispatch<PendingAction>,
  closeModal: (time: number) => NodeJS.Timeout
): Pet | undefined => {
  // console.log("validatePet", type);

  if (
    type === "POST" &&
    petList.find((item) => item.PetName === pet.PetName) !== undefined
  ) {
    dispatchPending({
      type: "IS_ERROR",
      payload: "一位寵物只能建立一個名片喔！",
    });
    closeModal(1000);
    return undefined;
  }

  const result = PetSchema.safeParse(pet);
  if (result.success) return result.data;

  const errorMessages = Object.values(result.error.formErrors.fieldErrors).map(
    (message) => message.toString()
  );
  dispatchPending({ type: "IS_ERROR_MULTI", payload: errorMessages });

  return undefined;
};

const useInitPet = (
  data: PetList[0] | undefined,
  dispatchPet: React.Dispatch<PetAction>
): void => {
  useEffect(() => {
    if (data === undefined) return;
    // console.log(data.ServiceTypes, data.FoodTypes);

    if (data.ServiceTypes[0] === "") {
      data.ServiceTypes.shift();
    }
    if (data.FoodTypes[0] === "") {
      data.FoodTypes.shift();
    }

    dispatchPet({
      type: "Init",
      payload: {
        FoodTypes: data.FoodTypes,
        PetAge: data.PetAge,
        PetMedicine: data.PetMedicine ?? "",
        PetName: data.PetName,
        PetNote: data.PetNote ?? "",
        PetPersonality: data.PetPersonality ?? "",
        PetPhoto: data.PetPhoto ?? "",
        PetSex: data.PetSex,
        PetType: data.PetType,
        ServiceTypes: data.ServiceTypes,
      },
    });
  }, [data, dispatchPet]);
};

const useRenderPhoto = (
  formdata: FormData | undefined,
  dispatchPet: React.Dispatch<PetAction>
): void => {
  useEffect(() => {
    if (formdata === undefined) return;
    const file = formdata.get("photo");
    if (file === null) return;
    const url = URL.createObjectURL(file as File);
    dispatchPet({ type: "PICK_PET_PHOTO", payload: url });
  }, [dispatchPet, formdata]);
};

const handleCheckBox = (
  element: HTMLInputElement,
  state: { FoodTypes: string[]; ServiceTypes: string[] },
  dispatchPet: React.Dispatch<PetAction>
): void => {
  const { name, value, checked } = element;

  if (checked) {
    switch (name) {
      case "FoodTypes":
        dispatchPet({
          type: "PICK_FOODTYPES",
          payload: [...state.FoodTypes, value],
        });
        break;
      case "services":
        dispatchPet({
          type: "PICK_SERVICETYPES",
          payload: [...state.ServiceTypes, value],
        });
        break;
      case "facilities":
        dispatchPet({
          type: "PICK_SERVICETYPES",
          payload: [...state.ServiceTypes, value],
        });
        break;
      case "specials":
        dispatchPet({
          type: "PICK_SERVICETYPES",
          payload: [...state.ServiceTypes, value],
        });
        break;

      default:
        break;
    }
  }

  if (!checked) {
    switch (name) {
      case "FoodTypes":
        dispatchPet({
          type: "PICK_FOODTYPES",
          payload: state.FoodTypes.filter((FoodType) => FoodType !== value),
        });
        break;
      case "services":
        dispatchPet({
          type: "PICK_SERVICETYPES",
          payload: state.ServiceTypes.filter(
            (ServiceType) => ServiceType !== value
          ),
        });
        break;
      case "facilities":
        dispatchPet({
          type: "PICK_SERVICETYPES",
          payload: state.ServiceTypes.filter(
            (ServiceType) => ServiceType !== value
          ),
        });
        break;
      case "specials":
        dispatchPet({
          type: "PICK_SERVICETYPES",
          payload: state.ServiceTypes.filter(
            (ServiceType) => ServiceType !== value
          ),
        });
        break;

      default:
        break;
    }
  }
};

const Edit = React.memo(
  ({ data, type, title, onClick }: IEditProps): JSX.Element => {
    console.log(data?.PetCardId);
    const { authToken } = useContext(UserAuth);
    const [pet, dispatchPet] = useReducer(petReducer, initPet);
    // console.log(pet.ServiceTypes);
    const [formdata, setFormData] = useState<FormData>();
    const queryClient = useQueryClient();
    const petList = queryClient.getQueryData<PetList>(["PetList"]);

    const { dispatchPending, closeModal } = useModal();
    useRenderPhoto(formdata, dispatchPet);
    useInitPet(data, dispatchPet);
    useEffect(() => clearInterval(closeModal(1000)));

    return (
      <MotionFade className="flex-center fixed left-0 top-0 z-10 h-screen w-full bg-black/50">
        <MotionPopup className="scrollbar-thumb-h-1/2 relative h-[calc(100%-24px)] w-full max-w-4xl overflow-scroll rounded-xl bg-white p-10 scrollbar-thin scrollbar-thumb-slate-700/50 scrollbar-thumb-rounded-3xl ">
          <>
            <button
              type="button"
              onClick={onClick}
              className="absolute right-11 top-11 text-xl"
            >
              <img src={xPath} alt="" />
            </button>
            <p className="mb-4 text-center text-3xl font-bold">{title}</p>
            <UploadImage
              onChange={(file) => {
                setFormData(toFormData("photo", file));
              }}
              defaultImage={pet.PetPhoto === "" ? undefined : pet.PetPhoto}
              type="Room"
              className="mb-6"
            />
            <Input
              onChange={(e) =>
                dispatchPet({ type: "PICK_PET_NAME", payload: e.target.value })
              }
              defaultValue={pet.PetName}
              {...input.PetName}
            />
            <hr className=" my-6 block border-stone-300" />
            <h2 className="mb-3 font-bold">寵物資訊</h2>
            <FilterInput
              required
              onChange={(e) =>
                dispatchPet({
                  type: "PICK_PET_TYPE",
                  payload: (e.target as HTMLInputElement).value,
                })
              }
              filterList={petLists}
              checked={pet.PetType}
              {...filterInput}
            />

            <FilterInput
              required
              onChange={(e) =>
                dispatchPet({
                  type: "PICK_PET_AGE",
                  payload: (e.target as HTMLInputElement).value,
                })
              }
              filterList={ageLists}
              checked={pet.PetAge}
              {...filterInput}
            />
            <FilterInput
              required
              onChange={(e) =>
                dispatchPet({
                  type: "PICK_PET_SEX",
                  payload: (e.target as HTMLInputElement).value,
                })
              }
              filterList={sexLists}
              checked={pet.PetSex}
              {...filterInput}
            />
            <FilterInput
              required
              onChange={(e) =>
                handleCheckBox(
                  e.target as HTMLInputElement,
                  {
                    FoodTypes: pet.FoodTypes,
                    ServiceTypes: pet.ServiceTypes,
                  },
                  dispatchPet
                )
              }
              filterList={foodLists}
              checked={data?.FoodTypes}
              {...filterInput}
            />

            <Input
              onChange={(e) =>
                dispatchPet({
                  type: "PICK_PET_PRSONALITY",
                  payload: e.target.value,
                })
              }
              defaultValue={pet.PetPersonality}
              {...input.PetPersonality}
            />
            <Input
              onChange={(e) =>
                dispatchPet({
                  type: "PICK_PET_MEDICINE",
                  payload: e.target.value,
                })
              }
              {...input.PetMedicine}
            />
            <Input
              onChange={(e) =>
                dispatchPet({ type: "PICK_PET_NOTE", payload: e.target.value })
              }
              {...input.PetNote}
            />
            <>
              <hr className=" my-6 block border-stone-300" />
              <h2 className="mb-3 font-bold">旅館需求</h2>
              <FilterInput
                onChange={(e) =>
                  handleCheckBox(
                    e.target as HTMLInputElement,
                    {
                      FoodTypes: pet.FoodTypes,
                      ServiceTypes: pet.ServiceTypes,
                    },
                    dispatchPet
                  )
                }
                filterList={serviceLists}
                checked={data?.ServiceTypes}
                {...filterInput}
              />
              <FilterInput
                onChange={(e) =>
                  handleCheckBox(
                    e.target as HTMLInputElement,
                    {
                      FoodTypes: pet.FoodTypes,
                      ServiceTypes: pet.ServiceTypes,
                    },
                    dispatchPet
                  )
                }
                filterList={facilitiesLists}
                checked={data?.ServiceTypes}
                {...filterInput}
              />
              <FilterInput
                onChange={(e) =>
                  handleCheckBox(
                    e.target as HTMLInputElement,
                    {
                      FoodTypes: pet.FoodTypes,
                      ServiceTypes: pet.ServiceTypes,
                    },
                    dispatchPet
                  )
                }
                filterList={specialsLists}
                checked={data?.ServiceTypes}
                {...filterInput}
                className="mb-10"
              />
            </>
            <Button
              text="儲存"
              type="Secondary"
              className="mt-10 w-full rounded-full py-2"
              onClick={async () => {
                dispatchPending({ type: "IS_LOADING" });

                // 比對petList 是否有相同的寵物名，初步避免使用者為同一隻寵物新增複數個卡片
                if (petList === undefined) {
                  dispatchPending({
                    type: "IS_ERROR",
                    payload: "請重新整理後再試一次",
                  });
                  closeModal(1000);
                  return;
                }

                if (
                  validatePet(
                    pet,
                    petList,
                    type,
                    dispatchPending,
                    closeModal
                  ) === undefined
                )
                  return;

                await handleRequest(
                  type,
                  pet,
                  authToken,
                  closeModal,
                  dispatchPending,
                  data?.PetCardId,
                  formdata
                );

                await queryClient.invalidateQueries(["PetList"]);
                closeModal(1000);

                onClick();
              }}
            />
          </>
        </MotionPopup>
      </MotionFade>
    );
  }
);

export default Edit;
