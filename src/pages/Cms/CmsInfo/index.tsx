import axios from "axios";
import React, {
  ChangeEvent,
  useContext,
  useLayoutEffect,
  useState,
} from "react";
import { Button, Form, Input, Select, TimePicker } from "antd";
import type { RcFile, UploadFile } from "antd/es/upload/interface";
import { useNavigate } from "react-router-dom";
import UploadImage from "../../../components/UploadImage";
import { CountyList } from "../../../types/schema";
import Filter from "../../../containers/Filter";
import AntdUploadImage from "./AntdUploadImage";
import getCountry from "../../../utils/getCountry";
import useFilter from "../../../hooks/useFilter";
import UserAuth from "../../../context/UserAuthContext";

const getBase64 = async (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

type LayoutType = Parameters<typeof Form>[0]["layout"];
function CmsInfo(): JSX.Element {
  const { authToken } = useContext(UserAuth);
  const navigate = useNavigate();
  // 引入antd Form
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState<LayoutType>("horizontal");
  // select城市資料
  const countrydata: CountyList | undefined = getCountry();
  // filter資料
  const { Services, Facilities, Specials, FoodTypes } = useFilter();
  // uploadImage
  const [ImagefileList, setImageFileList] = useState<UploadFile[]>([]);
  const [Thumbnail, setThumbnail] = useState<FormData>();
  const defaultThumbnail: null | string = null;
  // 請求網址
  const putInfo = "https://petcity.rocket-coding.com/hotel";
  const postImage = "https://petcity.rocket-coding.com/hotel/uploadhotelphotos";
  const postThumbnail = "https://petcity.rocket-coding.com/hotel/uploadprofile";
  // antd表單驗證成功時
  const onFinish = async (fieldsValue: any): Promise<void> => {
    // 將Timepicker 轉換格式
    const rangeTimeValue = fieldsValue["range-time-picker"];
    const HotelBusinessTime = [
      rangeTimeValue[0].format("HH:mm"),
      rangeTimeValue[1].format("HH:mm"),
    ];
    //所有input欄位的資料
    const result = {
      ...fieldsValue,
      HotelBusinessTime: [...HotelBusinessTime],
      FoodTypes,
      ServiceTypes: [...Services, ...Facilities, ...Specials, ...FoodTypes],
    };
    delete result["range-time-picker"];

    //將旅館照片打包成base64格式
    const base64Image = ImagefileList?.map((file) => file.thumbUrl);

    await axios
      .put(putInfo, result, {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      .then((res) => console.log("傳送資訊成功", res))
      .catch((err) => console.log("傳送資訊失敗", err));

    // await axios
    //   .post(postImage, base64Image, {
    //     headers: { Authorization: `Bearer ${authToken}` },
    //   })
    //   .then((res) => console.log("傳送照片成功", res))
    //   .catch((err) => console.log("傳送照片失敗", err));
    if (Thumbnail?.get("image")) {
      await axios
        .post(postThumbnail, Thumbnail, {
          headers: { Authorization: `Bearer ${authToken}` },
        })
        .then((res) => console.log("傳送大頭成功", res))
        .catch((err) => console.log("傳送大頭失敗", err));
    }
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

  useLayoutEffect(() => {
    if (authToken === "") {
      navigate("/home");
    }
  });

  console.log(Thumbnail?.get("Image"));
  return (
    <div className="relative flex flex-col ">
      <div className="mb-10 flex justify-center ">
        <UploadImage
          type="Avatar"
          onChange={(event) => {
            console.log(event);
          }}
          defaultImage={defaultThumbnail}
          setThumbnail={setThumbnail}
        />
      </div>
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
    </div>
  );
}

export default CmsInfo;
