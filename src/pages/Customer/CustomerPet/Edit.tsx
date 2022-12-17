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
import { Pet, POSTRoom, PostRoomSchema, Room } from "../../../types/schema";
import { PendingAction } from "../../../hooks/usePending";
import Input from "./Input";
import { input, filterInput } from "./data";
import { InitPet, initPet, PetAction, petReducer } from "./petReducer";
import Button from "../../../components/Button";

interface IEditProps {
  pet: InitPet;
  dispatchPet: React.Dispatch<PetAction>;
  setFormData: React.Dispatch<React.SetStateAction<FormData | undefined>>;
  title: string;
  onClick: () => void;
  type: "POST" | "PUT";
}

const handleRequest = async (
  type: "POST" | "PUT",
  data: POSTRoom,
  token: string,
  id?: number,
  formdata?: FormData
): Promise<boolean | string> => {
  console.log(type);

  if (type === "POST") {
    if (formdata === undefined) return "新增房型必須要有圖片";

    const res = await AxiosTryCatch(async () => postRoom(data, token));
    const { roomid } = res.result;
    const result = await AxiosTryCatch(async () =>
      uploadRoomPhoto(roomid, formdata, token)
    );

    if (result === undefined) return false;
    return true;
  }

  if (type === "PUT" && id !== undefined) {
    const result = await AxiosTryCatch(async () => putRoom(id, data, token));
    if (result === undefined) return false;

    if (formdata !== undefined) {
      await uploadRoomPhoto(id, formdata, token);
      return true;
    }
    return true;
  }
  return false;
};

const handleValidate = (
  type: "POST" | "PUT",
  dispatchPending: React.Dispatch<PendingAction>,
  formdata?: FormData
): void => {
  if (type === "PUT") return;
  if (formdata === undefined) {
    dispatchPending({
      type: "IS_ERROR",
      payload: "必須上傳圖片",
    });
    setTimeout(() => dispatchPending({ type: "DONE" }), 1000);
  }
};

const useInitState = (
  setState: React.Dispatch<React.SetStateAction<string | undefined>>,
  state?: string
): void => {
  useEffect(() => {
    console.log("useInit");
    if (state === undefined) return;
    setState(state);
  }, [setState, state]);
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
  ({
    pet,
    dispatchPet,
    title,
    onClick,
    setFormData,
    type,
  }: IEditProps): JSX.Element => {
    /* 以下欄位因為牽涉到價格以及旅館是否提供的問題，所在路徑"/book"時受到隱藏
    1. 寵物類型
    2. 飲食偏好
    3. 旅館需求
    */
    const { pathname } = useLocation();

    const { dispatchPending } = useModal();
    const queryClient = useQueryClient();
    const { authToken } = useContext(UserAuth);
    // console.log(pet);

    // useInitState(setPet, data?.PetType);

    return (
      <MotionFade className="flex-center fixed left-0 top-0 z-10 h-screen w-full bg-black/50">
        <MotionPopup className="scrollbar-thumb-h-1/2 relative flex h-fit w-full max-w-4xl flex-col justify-center overflow-scroll rounded-xl bg-white p-10 scrollbar-thin scrollbar-thumb-slate-700/50 scrollbar-thumb-rounded-3xl ">
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
            {!pathname.includes("/book") && (
              <FilterInput
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
            )}
            <FilterInput
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
            {!pathname.includes("/book") && (
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
                filterList={foodLists}
                checked={pet.FoodTypes}
                {...filterInput}
              />
            )}

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
            {!pathname.includes("/book") && (
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
                  checked={pet.FoodTypes}
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
                  checked={pet.FoodTypes}
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
                  checked={pet.FoodTypes}
                  {...filterInput}
                  className="mb-10"
                />
              </>
            )}
            <Button
              text="儲存"
              type="Secondary"
              className={`${
                !pathname.includes("/book") ? "" : "mt-10"
              } w-full rounded-full py-2`}
              onClick={onClick}
            />
          </>
        </MotionPopup>
      </MotionFade>
    );
  }
);

export default Edit;
