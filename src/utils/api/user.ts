/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable import/prefer-default-export */
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { AxiosTryCatch, baseURL } from "..";
import { Booking, UserInfoSchema } from "../../types/schema";
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

export const postBooking = async (body: Booking, token: string) => {
  const header = new Header(token);
  const data = await AxiosTryCatch<{
    status: string;
    orderId: number;
    message: "預約成功";
  }>(async () => axios.post(`${baseURL}/user/book`, body, header));

  return data;
};
