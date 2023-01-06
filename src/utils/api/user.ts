/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable import/prefer-default-export */
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { AxiosTryCatch, baseURL } from "..";
import {
  Booking,
  FavoriteListSchema,
  UserInfoSchema,
} from "../../types/schema";
import Header from "./Header";

export const useUserInfo = (token: string) => {
  const header = new Header(token);

  return useQuery(["UserInfo"], async () => {
    const data = await AxiosTryCatch(async () =>
      axios.get(`${baseURL}/user/book`, header)
    );

    const result = UserInfoSchema.safeParse(data.result);
    if (result.success) {
      return result.data;
    }
    if (data.Status === false) return false;

    return undefined;
  });
};

export const useFavoriteList = (token: string) => {
  const header = new Header(token);

  return useQuery(["FavoriteList"], async () => {
    const data = await AxiosTryCatch(async () =>
      axios.get(`${baseURL}/user/keepList`, header)
    );
    if (data.Status === false) return console.error("FavoriteList error");

    const result = FavoriteListSchema.safeParse(data.keepList);
    if (result.success) {
      return result.data;
    }
    console.error(result.error);

    return undefined;
  });
};

// export const deleteFavorite = async (hotelId: number, token: string) => {
//   console.log(token);
//   const header = new Header(token);
//   const data = await AxiosTryCatch(async () =>
//     axios.delete(`${baseURL}/user/keepList?hotelId=${hotelId}`, {}, header)
//   );

//   return data;
// };

export const postFavorite = async (hotelId: number, token: string) => {
  console.log(token);
  const header = new Header(token);
  const data = await AxiosTryCatch(async () =>
    axios.post(`${baseURL}/user/keepList?hotelId=${hotelId}`, {}, header)
  );

  return data;
};

export const postBooking = async (body: Booking, token: string) => {
  const header = new Header(token);
  const data = await AxiosTryCatch<{
    status: string;
    orderId: number;
    message: "預約成功";
  }>(async () => axios.post(`${baseURL}/user/book`, body, header));

  return data;
};
