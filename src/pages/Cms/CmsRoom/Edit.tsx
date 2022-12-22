import { Button, Form, Input } from "antd";
import React, { useContext, useEffect, useState } from "react";

import { useQueryClient } from "@tanstack/react-query";
import FilterInput from "../../../containers/Filter/FilterInput";
import { petLists } from "../../../containers/Filter/data";
import MotionFade from "../../../containers/MotionFade";
import MotionPopup from "../../../containers/MotionPopup";
import useModal from "../../../hooks/useModal";
import UploadImage from "../../../components/UploadImage";
import { xPath } from "../../../img/icons";
import { toFormData, AxiosTryCatch, tryCatch } from "../../../utils";
import { uploadRoomPhoto, putRoom, postRoom } from "../../../utils/api/cmsRoom";
import UserAuth from "../../../context/UserAuthContext";
import { POSTRoom, PostRoomSchema, Room } from "../../../types/schema";
import { PendingAction } from "../../../hooks/usePending";

interface IEditProps {
  title: string;
  onClick: () => void;
  data?: Room;
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
  const [form] = Form.useForm();
  const [petType, setPetType] = useState<string>();
  const [formdata, setFormData] = useState<FormData>();
  const { dispatchPending } = useModal();
  const queryClient = useQueryClient();
  const { authToken } = useContext(UserAuth);

  // console.log("render Edit");
  // console.log(data.RoomPhoto);
  useInitState(setPetType, data?.PetType);

  return (
    <MotionFade className="flex-center fixed left-0 top-0 z-10 h-screen w-full bg-black/50">
      <MotionPopup className="scrollbar-thumb-h-1/2 relative h-[calc(100%-24px)] overflow-scroll rounded-xl bg-white p-10 scrollbar-thin scrollbar-thumb-slate-700/50 scrollbar-thumb-rounded-3xl ">
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
              setFormData(toFormData("Image", file));
            }}
            defaultImage={data?.RoomPhoto}
            type="Room"
            className="mb-6"
          />

          <FilterInput
            onChange={(e) => {
              console.log(e);
              setPetType((e.target as HTMLInputElement).value);
            }}
            noContext
            required
            horizontal
            filterList={petLists}
            checked={petType}
            className="mb-5 ml-3"
          />
          <div>
            <Form
              labelCol={{ span: 3 }}
              // wrapperCol={{ span: 14 }}
              layout="horizontal"
              form={form}
              initialValues={{
                RoomName: data?.RoomName,
                RoomPrice: data?.RoomPrice,
                RoomInfo: data?.RoomInfo,
              }}
              autoComplete="on"
              onFinish={async (values) => {
                // console.log(values);
                handleValidate(type, dispatchPending);

                const parse = PostRoomSchema.safeParse({
                  ...values,
                  PetType: petType,
                });

                if (parse.success) {
                  console.log(parse.data);
                  dispatchPending({
                    type: "IS_LOADING",
                  });
                  const result = await tryCatch(
                    async () =>
                      handleRequest(
                        type,
                        parse.data,
                        authToken,
                        data?.Id,
                        formdata
                      ),
                    false
                  );
                  if (result === false) {
                    dispatchPending({
                      type: "IS_ERROR",
                      payload: "系統錯誤，請稍後再試",
                    });
                    return;
                  }
                  if (typeof result === "string") {
                    dispatchPending({
                      type: "IS_ERROR",
                      payload: result,
                    });
                    return;
                  }

                  await queryClient.invalidateQueries(["RoomList"]);
                  onClick();
                  dispatchPending({ type: "DONE" });
                }

                if (!parse.success) {
                  dispatchPending({
                    type: "IS_ERROR",
                    payload: "填寫欄位不完整",
                  });
                }
              }}
              onFinishFailed={(errorInfo) => console.log("Failed", errorInfo)}
              labelAlign="left"
            >
              <Form.Item
                label="房型名稱"
                name="RoomName"
                rules={[
                  { required: true, message: "必填項目" },
                  { type: "string", max: 16 },
                ]}
              >
                <Input placeholder="請填寫您的寵物房型名稱" />
              </Form.Item>

              <Form.Item
                label="價格"
                name="RoomPrice"
                rules={[
                  { required: true, message: "必填項目" },
                  { type: "string", max: 6, message: "不可以大於六位數" },
                ]}
              >
                <Input placeholder="請填寫您的寵物房型台幣價格" />
              </Form.Item>
              <Form.Item
                label="介紹"
                name="RoomInfo"
                rules={[
                  { required: true, message: "必填項目" },
                  { type: "string" },
                ]}
              >
                <Input.TextArea
                  rows={4}
                  placeholder="請填寫您的寵物房型介紹資訊"
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="flex-center h-max w-full rounded-full border-2 border-second bg-second text-white"
                >
                  送出
                </Button>
              </Form.Item>
            </Form>
          </div>
        </>
      </MotionPopup>
    </MotionFade>
  );
}

export default Edit;
