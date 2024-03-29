import { useQueryClient } from "@tanstack/react-query";
import { Button, Form, Input } from "antd";
import axios from "axios";
import { AnimatePresence } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../../../components/LoadingModal";
import UploadImage from "../../../components/UploadImage";
import UserAuth from "../../../context/UserAuthContext";
import { baseURL } from "../../../utils";
import { useCustormerInfo } from "../../../utils/api/customerInfo";
import Header from "../../../utils/api/Header";

function CustomerInfo(): JSX.Element {
  const [form] = Form.useForm();
  const [Thumbnail, setThumbnail] = useState<FormData>();
  const { authToken } = useContext(UserAuth);
  const navigate = useNavigate();
  const header = new Header(authToken);
  const { data, isLoading, isSuccess } = useCustormerInfo(authToken);

  const queryClient = useQueryClient();
  const defaultThumbnail: string | undefined | null = data?.UserPhoto;

  useEffect(() => {
    if (authToken === "") {
      navigate("/home");
    }
  }, []);
  const onFinish = async (fieldsValue: any): Promise<void> => {
    await axios.put(`${baseURL}/user`, fieldsValue, header);

    try {
      if (Thumbnail?.has("Image") ?? false) {
        await axios.post(`${baseURL}/user//uploadprofile`, Thumbnail, header);
      }
    } catch (error) {}

    await queryClient.invalidateQueries(["custormerInfo"]);
    queryClient.removeQueries(["custormerInfo"]);
  };

  const onFinishFailed = (errorInfo: any): void => {};
  return (
    <div className=" w-full px-10">
      {isLoading && (
        <AnimatePresence>
          <LoadingScreen />
        </AnimatePresence>
      )}
      {isSuccess && (
        <>
          <div className="mb-10 flex w-full justify-center ">
            <UploadImage
              type="Avatar"
              onChange={(event) => {}}
              defaultImage={defaultThumbnail}
              setThumbnail={setThumbnail}
            />
          </div>
          <Form
            labelCol={{ span: 4 }}
            size="large"
            wrapperCol={{ span: 20 }}
            form={form}
            autoComplete="on"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            labelAlign="left"
          >
            <Form.Item
              label="名稱"
              name="UserName"
              rules={[
                { required: true, message: "必填項目" },
                { type: "string", max: 16 },
              ]}
              initialValue={data.UserName}
            >
              <Input placeholder="名稱" />
            </Form.Item>

            <Form.Item
              label="電話"
              name="UserPhone"
              rules={[
                { required: true, message: "必填項目" },
                { type: "string", max: 11, message: "電話格式請小於11碼" },
              ]}
              initialValue={data.UserPhone}
            >
              <Input placeholder="電話" />
            </Form.Item>

            <Form.Item
              name="UserAddress"
              label=" 地址"
              rules={[{ required: true, message: "必填項目" }]}
              initialValue={data.UserAddress}
            >
              <Input style={{ width: "50" }} />
            </Form.Item>

            <Form.Item wrapperCol={{ span: 200 }} className="mt-8 w-full">
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                block
                className="flex-center  rounded-full border-2 border-second bg-second text-white"
              >
                送出
              </Button>
            </Form.Item>
          </Form>
        </>
      )}
    </div>
  );
}

export default CustomerInfo;
