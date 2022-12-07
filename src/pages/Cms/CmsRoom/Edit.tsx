import { Button, Form, Input } from "antd";
import { motion } from "framer-motion";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import FilterInput from "../../../containers/Filter/FilterInput";
import { petLists } from "../../../containers/Filter/data";
import MotionFade from "../../../containers/MotionFade";
import MotionPopup from "../../../containers/MotionPopup";
import useModal from "../../../hooks/useModal";
import UploadImage from "../../../components/UploadImage";
import { xPath } from "../../../img/icons";
import { assertIsError, toFormData } from "../../../utils";
import { uploadRoomPhoto, postRoom } from "../../../utils/api/hotel";
import UserAuth from "../../../context/UserAuthContext";
import { POSTRoomSchema } from "../../../types/schema";

interface IEditProps {
  onClick: () => void;
}

function Edit({ onClick }: IEditProps): JSX.Element {
  const [form] = Form.useForm();
  const [petType, setPetType] = useState("");
  const [formdata, setFormData] = useState<FormData>();
  const { dispatchPending } = useModal();
  console.log(petType);
  const { authToken } = useContext(UserAuth);
  console.log("render Edit");

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
          <p className="mb-4 text-center text-3xl font-bold">編輯寵物房型</p>
          <UploadImage
            onChange={(file) => {
              setFormData(toFormData(file));
            }}
            type="Room"
            className="mb-6"
          />

          <FilterInput
            onChange={(e) => setPetType((e.target as HTMLInputElement).value)}
            noContext
            required
            action="PICK-PetType"
            horizontal
            filterList={petLists}
            className="mb-5 ml-3"
          />
          <div>
            <Form
              labelCol={{ span: 3 }}
              // wrapperCol={{ span: 14 }}
              layout="horizontal"
              form={form}
              initialValues={{ layout: "horizontal" }}
              autoComplete="on"
              onFinish={async (values) => {
                const result = POSTRoomSchema.safeParse({
                  ...values,
                  PetType: petType,
                });
                dispatchPending({ type: "IS_LOADING" });
                if (result.success) {
                  try {
                    const res = await postRoom(result.data, authToken);
                    dispatchPending({
                      type: "IS_SUCCESS",
                      payload: "新增房型成功",
                    });
                    setTimeout(() => dispatchPending({ type: "DONE" }), 1000);
                    const { roomid } = res.data.result;

                    if (formdata === undefined) return;
                    console.log("upload photo");

                    const uploadResult = await uploadRoomPhoto(
                      roomid,
                      formdata,
                      authToken
                    );
                    console.log(uploadResult);

                    onClick();
                  } catch (error) {
                    const err = assertIsError(error);
                    console.log(err);
                    dispatchPending({
                      type: "IS_ERROR",
                      payload: "系統錯誤，請重新操作",
                    });
                    setTimeout(() => dispatchPending({ type: "DONE" }), 1000);
                  }
                } else {
                  console.log(result.error);
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
