import axios from "axios";
import React, { ChangeEvent, useState } from "react";
// import Button from "../../../components/Button";
import { Button, Form, Input, Select, TimePicker } from "antd";
import type { UploadFile } from "antd/es/upload/interface";
import UploadImage from "../../../components/UploadImage";
import { CountyList } from "../../../types/schema";
import Filter from "../../../containers/Filter";
import AntdUploadImage from "./AntdUploadImage";
import getCountry from "../../../utils/getCountry";
import useFilter from "../../../hooks/useFilter";

type LayoutType = Parameters<typeof Form>[0]["layout"];
function CmsInfo(): JSX.Element {
  // 引入antd Form
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState<LayoutType>("horizontal");
  const countrydata: CountyList | undefined = getCountry();
  const { FoodTypes, ServiceTypes } = useFilter();
  const [ImagefileList, setImageFileList] = useState<UploadFile[]>([]);
  const url = "https://petcity.rocket-coding.com/hotel";
  const onFinish = (fieldsValue: any): void => {
    const rangeTimeValue = fieldsValue["range-time-picker"];
    const HotelBusinessTime = [
      rangeTimeValue[0].format("HH:mm"),
      rangeTimeValue[1].format("HH:mm"),
    ];
    const result = {
      ...fieldsValue,
      HotelBusinessTime: [...HotelBusinessTime],
      FoodTypes: [...FoodTypes],
      ServiceTypes,
    };

    console.log(result);
  };

  const onFinishFailed = (errorInfo: any): void => {
    console.log("Failed:", errorInfo);
  };

  const prefixSelector = (
    <Form.Item name="areaid" noStyle>
      <Select style={{ width: 100 }}>
        {countrydata?.map((item) => (
          <Select.Option value={item.Id}>{item.Areas}</Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
  const normFile = (event: ChangeEvent<HTMLInputElement>): FileList => {
    console.log("Upload event:", event);
    if (Array.isArray(event)) {
      return event;
    }
    return event?.fileList;
  };
  console.log(FoodTypes, ServiceTypes);
  return (
    <div className="relative">
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout={formLayout}
        form={form}
        initialValues={{ layout: formLayout }}
        autoComplete="on"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        labelAlign="left"
      >
        <Form.Item
          label="名稱"
          name="HotelName"
          rules={[
            { required: true, message: "必填項目" },
            { type: "string", max: 16 },
          ]}
        >
          <Input placeholder="名稱" />
        </Form.Item>

        <Form.Item
          label="電話"
          name="HotelPhone"
          rules={[
            { required: true, message: "必填項目" },
            { type: "string", max: 11, message: "電話格式請小於11碼" },
          ]}
        >
          <Input placeholder="電話" />
        </Form.Item>

        <Form.Item
          name="HotelAddress"
          label="飯店地址"
          rules={[{ required: true, message: "必填項目" }]}
        >
          <Input addonBefore={prefixSelector} style={{ width: "50" }} />
        </Form.Item>

        <Form.Item
          name="range-time-picker"
          label="營業時間"
          rules={[{ required: true, message: "必填項目" }]}
        >
          <TimePicker.RangePicker format="HH:mm" />
        </Form.Item>

        <Form.Item
          name="HotelInfo"
          label="介紹"
          rules={[{ required: true, message: "必填項目" }]}
        >
          <Input showCount maxLength={500} />
        </Form.Item>

        {/* <div className="mt-10 flex justify-center ">
          <UploadImage />
        </div> */}
        <Form.Item
          label="上傳圖片"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <AntdUploadImage
            ImagefileList={ImagefileList}
            setImageFileList={setImageFileList}
          />
        </Form.Item>

        <Form.Item
          wrapperCol={{ span: 200 }}
          className="absolute bottom-0 w-full"
        >
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            block
            className="flex-center absolute -bottom-20 inline-block h-max w-full rounded-full border-2 border-second bg-second text-white"
          >
            送出
          </Button>
        </Form.Item>
      </Form>
      <Filter horizontal closePet closeRoomPrices className="my-5" />
      {/* <button
        type="button"
        onClick={() => {
        }}
      >
        123
      </button> */}
    </div>
  );
}

export default CmsInfo;
