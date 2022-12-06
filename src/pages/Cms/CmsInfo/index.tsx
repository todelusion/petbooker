import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { ChangeEvent, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
// import Button from "../../../components/Button";
import { AutoComplete, Button, Form, Input, Select, TimePicker } from "antd";
import UploadImage from "../../../components/UploadImage";
import { CountyList, countySchema } from "../../../types/schema";
import Filter from "../../../containers/Filter";
import AntdUploadImage from "./AntdUploadImage";
import getCountry from "../../../utils/getCountry";

type LayoutType = Parameters<typeof Form>[0]["layout"];
function CmsInfo(): JSX.Element {
  // 引入antd Form
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState<LayoutType>("horizontal");
  const countrydata: CountyList | undefined = getCountry();
  const onFinish = (fieldsValue: any): void => {
    const rangeTimeValue = fieldsValue["range-time-picker"];
    const value = {
      "range-time-picker": [
        rangeTimeValue[0].format("HH:mm"),
        rangeTimeValue[1].format("HH:mm"),
      ],
    };

    const result = { ...fieldsValue, ...value };
    console.log("Success:", result);
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
        <Select.Option value="0">台北</Select.Option>
        <Select.Option value="1">台中</Select.Option>
      </Select>
    </Form.Item>
  );

  const handleInfo = (e: React.ChangeEvent<HTMLInputElement>): void => {
    console.log("Change:", e.target.value);
  };

  const normFile = (event: ChangeEvent<HTMLInputElement>): FileList => {
    console.log("Upload event:", event);
    if (Array.isArray(event)) {
      return event;
    }
    return event?.fileList;
  };

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
          <Input showCount maxLength={500} onChange={handleInfo} />
        </Form.Item>

        {/* <div className="mt-10 flex justify-center ">
          <UploadImage />
        </div> */}
        <Form.Item
          name="HotelPhoto"
          label="上傳圖片"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <AntdUploadImage />
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
            className="flex-center inline-block h-max w-full rounded-full border-2 border-second bg-second text-white"
          >
            送出
          </Button>
        </Form.Item>
      </Form>
      <Filter
        horizontal
        closePet
        closeRoomPrices
        className="my-5"
        onChange={(filter) => console.log(filter.PetType)}
      />
    </div>
  );
}

export default CmsInfo;
