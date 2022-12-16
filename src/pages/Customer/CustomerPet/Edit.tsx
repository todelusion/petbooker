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

          <FilterInput
            onChange={(e) => setPetType((e.target as HTMLInputElement).value)}
            noContext
            required
            labelWidth="min-w-[5rem]"
            action="PICK-PetType"
            horizontal
            filterList={petLists}
            checked={data?.PetType}
            className="mb-5"
          />
          <form>
            <Input
              required
              title="寵物名子"
              name="PetName"
              labelWidth="min-w-[5rem]"
              placeholder="請填寫您的寵物名字"
            />
            <Input
              title="年齡"
              name="PetName"
              labelWidth="min-w-[5rem]"
              placeholder="請填寫您的寵物名字"
            />
          </form>
        </>
      </MotionPopup>
    </MotionFade>
  );
}

export default Edit;
