import { Button, Form, Input } from "antd";
import { motion } from "framer-motion";
import React, { useEffect } from "react";
import FilterInput from "../../../containers/Filter/FilterInput";
import { petLists } from "../../../containers/Filter/data";
import MotionFade from "../../../containers/MotionFade";
import MotionPopup from "../../../containers/MotionPopup";
import useModal from "../../../hooks/useModal";
import UploadImage from "../../../components/UploadImage";
import { xPath } from "../../../img/icons";

interface IEditProps {
  onClick: () => void;
}

function Edit({ onClick }: IEditProps): JSX.Element {
  const [form] = Form.useForm();
  console.log("render Edit");

  return (
    <MotionFade className="flex-center fixed left-0 top-0 z-10 min-h-screen w-full bg-black/50">
      <MotionPopup className="relative rounded-3xl bg-white p-10">
        <>
          <button
            type="button"
            onClick={onClick}
            className="absolute right-11 top-11 text-xl"
          >
            <img src={xPath} alt="" />
          </button>
          <p className="mb-4 text-center text-3xl font-bold">編輯寵物房型</p>
          <UploadImage type="Room" className="mb-6" />
          <FilterInput
            onChange={(e) => console.log(e)}
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
              onFinish={(values) => console.log(values)}
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
