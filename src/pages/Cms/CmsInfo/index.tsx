import axios from "axios";
import React, {
  ChangeEvent,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { Button, Form, Input, Select, TimePicker } from "antd";
import type { UploadFile } from "antd/es/upload/interface";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import UploadImage from "../../../components/UploadImage";
import { CountyList, HotelInfoSchema } from "../../../types/schema";
import Filter from "../../../containers/Filter";
import AntdUploadImage from "./AntdUploadImage";
import getCountry from "../../../utils/getCountry";
import useFilter from "../../../hooks/useFilter";
import UserAuth from "../../../context/UserAuthContext";
import useModal from "../../../hooks/useModal";
import { useRoomList } from "../../../utils/api/hotel";
import { useHotelInfo } from "../../../utils/api/hotelInfo";

type LayoutType = Parameters<typeof Form>[0]["layout"];

function CmsInfo(): JSX.Element {
  const { dispatchPending } = useModal();
  // 若無Token則返回/home
  const { authToken } = useContext(UserAuth);
  const navigate = useNavigate();
  // 請求網址
  const getInfo = "https://petcity.rocket-coding.com/hotel";
  const putInfo = "https://petcity.rocket-coding.com/hotel";
  const postImage = "https://petcity.rocket-coding.com/hotel/uploadhotelphotos";
  const postThumbnail = "https://petcity.rocket-coding.com/hotel/uploadprofile";

  const [defaultImagefileList, setdefaultImagefileList] = useState<
    object[] | undefined
  >();
  console.log(defaultImagefileList);

  const { data, isSuccess, isFetching } = useHotelInfo(authToken);
  console.log(data?.HotelPhotos);

  useEffect(() => {
    if (data !== undefined) {
      const result = data.HotelPhotos.map((item) => {
        if (item === null) return [];
        return {
          uid: item.ImageId,
          thumbUrl: `data:image/png;base64,${item.Base64}`,
          name: "image.png",
          status: "done",
          url: item.ImageUrl,
        };
      });
      setdefaultImagefileList(result);
    }
  }, [data]);

  // 獲取資料
  // const { data, isFetching, isSuccess } = useQuery(["Info"], async () => {
  //   const response = await axios.get(getInfo, {
  //     headers: { Authorization: `Bearer ${authToken}` },
  //   });
  //   setdefaultImagefileList(
  //     response.data.result.HotelPhotos.map((item) => ({
  //       uid: item.ImageId,
  //       thumbUrl: `data:image/png;base64,${item.Base64}`,
  //       name: "image.png",
  //       status: "done",
  //       url: `${item.ImageUrl}`,
  //     }))
  //   );
  //   return HotelInfoSchema.parse(response.data.result);
  // });
  // if (isFetching) {
  //   dispatchPending({ type: "IS_LOADING" });
  // }
  console.log(defaultImagefileList);
  // 引入antd Form
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState<LayoutType>("horizontal");
  // select城市資料
  const countrydata: CountyList | undefined = getCountry();
  // filter資料
  const { Services, Facilities, Specials, FoodTypes } = useFilter();
  // uploadImage
  const [ImagefileList, setImageFileList] = useState<UploadFile[]>();
  const [DelImage, setDelImage] = useState<number[]>([]);
  const [Thumbnail, setThumbnail] = useState<FormData>();
  const defaultThumbnail: string | undefined | null = data?.HotelThumbnail;
  // console.log(DelImage);

  // antd表單驗證成功時
  const onFinish = async (fieldsValue: any): Promise<void> => {
    // 將Timepicker 轉換格式
    const rangeTimeValue = fieldsValue["range-time-picker"];
    const HotelBusinessTime = [
      rangeTimeValue[0].format("HH:mm"),
      rangeTimeValue[1].format("HH:mm"),
    ];

    // 所有input欄位的資料
    const result = {
      ...fieldsValue,
      HotelBusinessTime: [...HotelBusinessTime],
      FoodTypes,
      ServiceTypes: [...Services, ...Facilities, ...Specials, ...FoodTypes],
    };
    delete result["range-time-picker"];

    // 將旅館照片打包成base64格式
    const AddImage = ImagefileList?.map((file) => ({
      Base64: file.thumbUrl?.split(",")[1],
      Extension: "png",
    }));
    console.log(AddImage);

    const postImagebae64 = {
      AddImage,
      DelImage,
    };

    await axios
      .put(putInfo, result, {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      .then((res) => console.log("傳送資訊成功", res))
      .catch((err) => console.log("傳送資訊失敗", err));

    await axios
      .post(postImage, postImagebae64, {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      .then((res) => console.log("傳送照片成功", res))
      .catch((err) => console.log("傳送照片失敗", err));
    if (Thumbnail?.has("Image") ?? false) {
      await axios
        .post(postThumbnail, Thumbnail, {
          headers: { Authorization: `Bearer ${authToken}` },
        })
        .then((res) => console.log("傳送大頭成功", res))
        .catch((err) => console.log("傳送大頭失敗", err));
    }
    navigate("/cms/info");
  };

  const onFinishFailed = (errorInfo: any): void => {
    console.log("Failed:", errorInfo);
  };

  const prefixSelector = (
    <Form.Item name="areaid" noStyle initialValue={data?.HotelArea}>
      <Select style={{ width: 100 }}>
        {countrydata?.map((item) => (
          <Select.Option key={item.Id} value={item.Id}>
            {item.Areas}
          </Select.Option>
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
  }, []);
  // useEffect(() => {
  //   function setInitImage(): void {
  //     if (isSuccess) {
  //       // if (data?.HotelPhotos.length === 0) return;
  //       data.HotelPhotos.forEach((item) => {
  //         console.log(item.ImageId);
  //       });
  //       const resultAry = data.HotelPhotos.map((item) => ({
  //         uid: item.ImageId,
  //         thumbUrl: `data:image/png;base64,${item.Base64}`,
  //         name: "image.png",
  //         status: "done",
  //         url: `${item.ImageUrl}`,
  //       }));
  //       setImageFileList(resultAry);
  //       setImageFileList([
  //         {
  //           uid: "-1",
  //           name: "image.png",
  //           status: "done",
  //           url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
  //         },
  //       ]);
  //       console.log(resultAry);
  //     }
  //   }
  //   setInitImage();
  // }, []);

  return (
    <div className="relative flex flex-col ">
      {isFetching && <p>loading</p>}
      {isSuccess && (
        <>
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
              initialValue={data.HotelName}
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
              initialValue={data.HotelPhone}
            >
              <Input placeholder="電話" />
            </Form.Item>

            <Form.Item
              name="HotelAddress"
              label="飯店地址"
              rules={[{ required: true, message: "必填項目" }]}
              initialValue={data.HotelAddress}
            >
              <Input addonBefore={prefixSelector} style={{ width: "50" }} />
            </Form.Item>

            <Form.Item
              name="range-time-picker"
              label="營業時間"
              rules={[{ required: true, message: "必填項目" }]}
              initialValue={
                data.HotelEndTime != null
                  ? [
                      dayjs(data.HotelStartTime, "HH:mm"),
                      dayjs(data.HotelEndTime, "HH:mm"),
                    ]
                  : ""
              }
            >
              <TimePicker.RangePicker format="HH:mm" />
            </Form.Item>

            <Form.Item
              name="HotelInfo"
              label="介紹"
              rules={[{ required: true, message: "必填項目" }]}
              initialValue={data.HotelInfo}
            >
              <Input showCount maxLength={500} />
            </Form.Item>

            <Form.Item
              label="上傳圖片"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              initialValue={data.HotelPhotos}
            >
              <AntdUploadImage
                ImagefileList={ImagefileList}
                setImageFileList={setImageFileList}
                defaultFileList={defaultImagefileList}
                setDelImage={setDelImage}
                DelImage={DelImage}
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
        </>
      )}
    </div>
  );
}

export default CmsInfo;
