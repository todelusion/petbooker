import { useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { AnimatePresence } from "framer-motion";
import React, {
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import { NavigateFunction, useNavigate, useParams } from "react-router-dom";
import Button from "../../../components/Button";
import { translatePet } from "../../../containers/Filter/data";
import MotionFade from "../../../containers/MotionFade";
import UserAuth from "../../../context/UserAuthContext";
import useFilter from "../../../hooks/useFilter";
import useModal from "../../../hooks/useModal";
import { PendingAction } from "../../../hooks/usePending";
import useSearchBar from "../../../hooks/useSearchBar";
import { EditPath, LoadingCustom } from "../../../img/icons";
import {
  Booking,
  BookingSchema,
  Hotel,
  Pet,
  PetSchema,
  UserInfo,
} from "../../../types/schema";
import { AxiosTryCatch } from "../../../utils";
import { postPet, postPetPhoto } from "../../../utils/api/petCard";
import {
  PostBook,
  postBooking,
  PostBooking,
  usePostBook,
  useUserInfo,
} from "../../../utils/api/user";
import { sortedServiceTypes } from "../../../utils/servicesTranslator";
// import petCard from "../CustomerPet/data";
import Edit from "./Edit";
import { initPet, PetAction, petReducer } from "../CustomerPet/petReducer";
import PetInfo from "./PetInfo";

const validatePet = (
  pet: Pet,
  dispatchPending: React.Dispatch<PendingAction>
): boolean => {
  console.log("validatePet");
  const result = PetSchema.safeParse(pet);
  if (result.success) return true;

  const errorMessages = Object.values(result.error.formErrors.fieldErrors).map(
    (message) => message.toString()
  );
  dispatchPending({ type: "IS_ERROR_MULTI", payload: errorMessages });

  return false;
};

const validateUserBook = (
  body: Partial<Booking>,
  dispatchPending: React.Dispatch<PendingAction>
): Booking | undefined => {
  const result = BookingSchema.safeParse(body);
  if (result.success) return result.data;

  console.log(result.error);

  const errorMessages = Object.values(result.error.formErrors.fieldErrors).map(
    (message) => message.toString()
  );

  dispatchPending({ type: "IS_ERROR_MULTI", payload: errorMessages });
  return undefined;

  // if (UserNameRef.current?.value === "") {
  //   dispatchPending({
  //     type: "IS_ERROR",
  //     payload: "必須輸入飼主姓名",
  //   });
  //   setTimeout(() => dispatchPending({ type: "DONE" }), 1000);
  //   return;
  // }

  // if (!Number.isNaN(Number(UserPhoneRef.current?.value))) {
  //   dispatchPending({
  //     type: "IS_ERROR",
  //     payload: "必須輸入正確的電話號碼格式",
  //   });
  //   setTimeout(() => dispatchPending({ type: "DONE" }), 1000);
  // }
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

const useDisableScroll = (isShow: string | undefined): void => {
  const body = document.querySelector("body");
  useEffect(() => {
    if (body === null) return;

    if (isShow !== undefined) {
      body.style.overflowY = "hidden";
    } else {
      body.style.overflowY = "auto";
    }
  }, [body, isShow]);
};
const useCheckBeforeMount = (
  required: {
    user: UserInfo | boolean | undefined;
    PetType: string;
    FoodTypes: string[];
  },
  navigate: NavigateFunction,
  setAuthToken: React.Dispatch<React.SetStateAction<string>>
): boolean => {
  const { user, FoodTypes, PetType } = required;
  useEffect(() => {
    if (FoodTypes[0] !== undefined || PetType !== "") return;
    setTimeout(() => navigate("/home"), 2000);

    if (user !== false) return;
    setAuthToken("");
    localStorage.setItem("token", "");
    setTimeout(() => navigate("/login"), 2000);
  });
  if (user === false) return false;
  if (FoodTypes[0] === undefined || PetType === "") return false;
  return true;
};
// const useRequired
const useContextToCurrent = (
  PetType: string,
  FoodTypes: string[],
  dispatchPet: React.Dispatch<PetAction>
): void => {
  useEffect(() => {
    if (PetType !== "") {
      dispatchPet({ type: "PICK_PET_TYPE", payload: PetType });
    }
    if (FoodTypes[0] !== undefined) {
      dispatchPet({ type: "PICK_FOODTYPES", payload: FoodTypes });
    }
  }, [FoodTypes, PetType, dispatchPet]);
};

function CustomerBook(): JSX.Element {
  const UserNameRef = useRef<HTMLInputElement>(null);
  const UserPhoneRef = useRef<HTMLInputElement>(null);
  const [pet, dispatchPet] = useReducer(petReducer, initPet);
  const [formdata, setFormData] = useState<FormData>();
  const [isShow, setIsShow] = useState<"POST" | "PUT">();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { roomid, roomname, price } = useParams();

  const { authToken, setAuthToken } = useContext(UserAuth);
  const { data: user } = useUserInfo(authToken);
  const { selection } = useSearchBar();
  const { dispatchPending } = useModal();

  // useRedirect(selection.startDate, selection.endDate);
  const hotel = queryClient.getQueryData<Hotel>(["Hotel"])?.Hotel[0];
  const { PetType, FoodTypes, Services, Specials, Facilities } = useFilter();

  useDisableScroll(isShow);
  useRenderPhoto(formdata, dispatchPet);
  useContextToCurrent(PetType, FoodTypes, dispatchPet);
  useEffect(() => () => {
    clearInterval(setTimeout(() => dispatchPending({ type: "DONE" }), 1000));
    clearInterval(setTimeout(() => navigate("/login"), 2000));
  });
  if (
    !useCheckBeforeMount({ user, PetType, FoodTypes }, navigate, setAuthToken)
  )
    return (
      // 未來應該使用 404 頁面更改成 "登入閒置過久，請重新登入"
      <MotionFade className="flex-col-center fixed left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 text-xl">
        <>
          <LoadingCustom color="bg-accent" className=" mb-5" />
          {user === false && <p>登入閒置過久，請重新登入</p>}
          {PetType === "" && (
            <p>
              必須先選擇{" "}
              <span className=" font-bold text-second">寵物類型</span>{" "}
            </p>
          )}
          {FoodTypes[0] === undefined && (
            <p>
              必須先至少一個{" "}
              <span className=" font-bold text-second">食物偏好</span>
            </p>
          )}
          <LoadingCustom color="bg-accent" className=" mt-5" />
        </>
      </MotionFade>
    );

  return (
    <div className="flex-center pt-48 pb-28">
      <div className="w-full max-w-6xl">
        <h2 className="mb-4 text-center text-4xl font-bold">預約資料確認</h2>
        <p className=" mb-4 text-2xl font-bold text-gray-500">寵物名片</p>
        <section className="relative mb-12 flex h-80 rounded-sm border-2 border-gray-300 p-6">
          <button
            onClick={() => setIsShow("PUT")}
            type="button"
            className="absolute right-2 top-2 outline-none duration-75 hover:scale-110"
          >
            <img src={EditPath} alt="" />
          </button>
          <ul className="mr-7 basis-2/12">
            <li className=" mb-6 h-40">
              {pet.PetPhoto === "" ? (
                <div className="h-full w-full bg-gray-200" />
              ) : (
                <img
                  src={pet.PetPhoto}
                  alt=""
                  className="h-full w-full object-cover"
                />
              )}
            </li>
            <li className="text-xl font-bold">{pet.PetName}</li>
          </ul>

          <ul className="mr-6 grid basis-4/12 grid-cols-1 content-start gap-y-2 border-r-2">
            <li className="mb-2 font-bold">寵物資訊</li>
            <PetInfo label="寵物類型" require content={translatePet[PetType]} />
            <PetInfo label="年齡" require content={pet?.PetAge} />
            <PetInfo label="性別" require content={pet?.PetSex} />
            <PetInfo label="飲食偏好" require content={FoodTypes} />
            <PetInfo label="個性" content={pet?.PetPersonality} />
            <PetInfo label="備用藥物" content={pet?.PetMedicine} />
            <PetInfo label="備註" content={pet?.PetNote} />
          </ul>
          <ul className="basis-6/12">
            <li className="mb-1 font-bold">旅館需求</li>
            {Services.length < 1 &&
              Facilities.length < 1 &&
              Specials.length < 1 && <p>無</p>}
            {Services.length > 0 && (
              <li className="mb-4 ">
                <p className="mb-4">服務內容：</p>
                <p className="-ml-1">
                  {Services.map((service) => (
                    <span
                      key={service}
                      className="mr-2 rounded-full border-2 border-black px-4 py-2"
                    >
                      {service}
                    </span>
                  ))}
                </p>
              </li>
            )}
            {Facilities.length > 0 && (
              <li className="mb-4">
                <p className="mb-4">設施條件：</p>
                <p className="-ml-1">
                  {Facilities.map((facility) => (
                    <span
                      key={facility}
                      className="mr-2 rounded-full border-2 border-black px-4 py-2"
                    >
                      {facility}
                    </span>
                  ))}
                </p>
              </li>
            )}
            {Specials.length > 0 && (
              <li>
                <p className="mb-4">特殊需求：</p>
                <p className="-ml-1">
                  {Specials.map((special) => (
                    <span
                      key={special}
                      className="mr-2 rounded-full border-2 border-black px-4 py-2"
                    >
                      {special}
                    </span>
                  ))}
                </p>
              </li>
            )}
          </ul>
        </section>
        <p className=" mb-4 text-2xl font-bold text-gray-500">預約資訊</p>
        {hotel === undefined ? (
          <p>無訂單資訊，請重新選擇房型</p>
        ) : (
          <section className="mb-12 flex h-80 rounded-sm border-2 border-gray-300 p-6">
            <ul className="mr-5 basis-2/12">
              <li className=" mb-6 h-40">
                {hotel.HotelPhoto.length < 0 ? (
                  <div className="h-full w-full bg-gray-200" />
                ) : (
                  <img
                    src={hotel?.HotelPhoto[0]}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                )}
              </li>
              <li className="text-xl font-bold">{hotel.HotelName}</li>
            </ul>

            <ul className="mr-6 grid basis-4/12 grid-cols-1 content-start gap-y-1">
              <li className="mb-2 font-bold">訂房資訊</li>
              <li>
                <span>房型：</span>
                <span>{roomname}</span>
              </li>
              <li>
                <span>入住日期：</span>
                <span>{format(selection.startDate, "yyyy/MM/dd")}</span>
              </li>
              <li>
                <span>退房日期：</span>
                <span>{format(selection.endDate, "yyyy/MM/dd")}</span>
              </li>
              <li className=" mb-14">
                <span>總計入住：</span>
                <span>
                  {(selection.endDate.getTime() -
                    selection.startDate.getTime()) /
                    86400000}
                  晚
                </span>
              </li>
              <li className="flex items-center">
                <span>訂單總價格：</span>
                <span className="text-lg font-bold text-primary">
                  NTD &nbsp;
                  {((selection.endDate.getTime() -
                    selection.startDate.getTime()) /
                    86400000) *
                    Number(price)}
                </span>
              </li>
            </ul>
            <div className="flex-center h-full">
              <hr
                style={{ borderStyle: "solid" }}
                className="mx-8 block h-[calc(100%-2rem)] border-r-2 border-stone-300"
              />
            </div>
            <ul className="basis-6/12">
              <li className="mb-4">
                <p className="mb-1 font-bold">飼主資訊</p>
                <span>Email：</span>
                <span>{user === false ? undefined : user?.UserAccount}</span>
              </li>
              <li className="mb-4">
                <p className="relative mb-1 font-bold">
                  <span>飼主名稱</span>
                  <span className=" absolute -left-2 -top-1 font-medium text-red-600">
                    *
                  </span>
                </p>
                <input
                  ref={UserNameRef}
                  type="text"
                  defaultValue={user === false ? undefined : user?.UserName}
                  className="w-full rounded-lg border-2 border-black px-2 py-2 outline-none"
                />
              </li>
              <li className="mb-4">
                <p className="relative mb-1 font-bold">
                  <span>連絡電話</span>
                  <span className=" absolute -left-2 -top-1 font-medium text-red-600">
                    *
                  </span>
                </p>
                <input
                  ref={UserPhoneRef}
                  type="text"
                  defaultValue={user?.UserPhone?.toString()}
                  className="w-full rounded-lg border-2 border-black px-2 py-2 outline-none"
                />
              </li>
            </ul>
          </section>
        )}
        <Button
          type="Secondary"
          text="確認訂房"
          className="mx-auto py-2 px-10"
          onClick={async () => {
            if (!validatePet(pet, dispatchPending)) return;
            // 必須判斷若寵物名稱重複則不得重複發 postPet
            dispatchPending({ type: "IS_LOADING" });
            const petResult = await postPet(pet, authToken);

            if (petResult === undefined) {
              dispatchPending({
                type: "IS_ERROR",
                payload: "系統錯誤，請重新再試",
              });
              setTimeout(() => dispatchPending({ type: "DONE" }), 1000);
              return;
            }

            if (formdata !== undefined) {
              const photoResult = await postPetPhoto(
                petResult.petid,
                formdata,
                authToken
              );
              if (photoResult === undefined)
                dispatchPending({
                  type: "IS_ERROR",
                  payload: "上傳寵物照片錯誤，請至「我的寵物名片」補上寵物照片",
                });
            }

            const body = validateUserBook(
              {
                CheckInDate: format(selection.startDate, "yyyy/M/d"),
                CheckOutDate: format(selection.endDate, "yyyy/M/d"),
                PetCardId: petResult.petid,
                UserName: UserNameRef.current?.value,
                UserPhone: UserPhoneRef.current?.value,
                RoomId: Number(roomid),
                TotalNight:
                  (selection.endDate.getTime() -
                    selection.startDate.getTime()) /
                  86400000,
                TotalPrice:
                  ((selection.endDate.getTime() -
                    selection.startDate.getTime()) /
                    86400000) *
                  Number(price),
                Status: "",
              },
              dispatchPending
            );

            if (body === undefined) return;

            if ((await postBooking(body, authToken)) === undefined) {
              dispatchPending({
                type: "IS_ERROR",
                payload: "系統錯誤，請重新再試",
              });
              setTimeout(() => dispatchPending({ type: "DONE" }), 1000);
              return;
            }
            dispatchPending({ type: "DONE" });
            navigate("/hotel/book/success");
          }}
        />
      </div>
      <AnimatePresence>
        {isShow !== undefined && (
          // 旅館需求因為牽涉到價格問題，所以不能在訂單資料直接修改

          <Edit
            pet={pet}
            dispatchPet={dispatchPet}
            setFormData={setFormData}
            title="編輯寵物名片"
            type="PUT"
            key="EDIT"
            onClick={() => setIsShow(undefined)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default CustomerBook;
