import { motion } from "framer-motion";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";
import FilterInput from "../../../containers/Filter/FilterInput";
import { petLists } from "../../../containers/Filter/data";
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
import input from "./data";

interface IEditProps {
  title: string;
  onClick: () => void;
  data?: Pet;
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

function Edit({ title, onClick, data, type }: IEditProps): JSX.Element {
  const [petType, setPetType] = useState<string>();
  const [formdata, setFormData] = useState<FormData>();
  const { dispatchPending } = useModal();
  const queryClient = useQueryClient();
  const { authToken } = useContext(UserAuth);

  // useInitState(setPetType, data?.PetType);

  return (
    <MotionFade className="flex-center fixed left-0 top-0 z-10 h-screen w-full bg-black/50">
      <MotionPopup className="scrollbar-thumb-h-1/2 relative h-[calc(100%-24px)] max-w-4xl overflow-scroll rounded-xl bg-white p-10 scrollbar-thin scrollbar-thumb-slate-700/50 scrollbar-thumb-rounded-3xl ">
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
              setFormData(toFormData(file));
            }}
            defaultImage={data?.RoomPhoto}
            type="Room"
            className="mb-6"
          />
          <Input
            onChange={(e) => console.log(e.target.value)}
            {...input.PetName}
          />
          <hr className=" my-6 block border-stone-300" />
          <h2 className="mb-3 font-bold">寵物資訊</h2>
          <FilterInput
            onChange={(e) => setPetType((e.target as HTMLInputElement).value)}
            noContext
            required
            labelWidth="min-w-[5rem]"
            horizontal
            filterList={petLists}
            checked={data?.PetType}
            className="mb-5"
            classNames={{ p: "font-normal text-sm" }}
          />

          <Input
            onChange={(e) => console.log(e.target.value)}
            title="個性"
            name="PetPersonality"
            labelWidth="min-w-[5rem]"
            className=" mb-4"
            classNames={{ p: "text-sm" }}
          />
          <Input
            onChange={(e) => console.log(e.target.value)}
            title="服用藥物"
            name="PetMedicine"
            className=" mb-4"
            labelWidth="min-w-[5rem]"
            classNames={{ p: "text-sm" }}
          />
          <Input
            onChange={(e) => console.log(e.target.value)}
            title="備註"
            name="PetNote"
            labelWidth="min-w-[5rem]"
            classNames={{ p: "text-sm" }}
          />
        </>
      </MotionPopup>
    </MotionFade>
  );
}

export default Edit;
