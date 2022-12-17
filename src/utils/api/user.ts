/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable import/prefer-default-export */
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { AxiosTryCatch, baseURL } from "..";
import {
  HotelSchema,
  PostBook,
  UserInfo,
  UserInfoSchema,
} from "../../types/schema";
import Header from "./Header";

export const useUserInfo = (token: string) => {
  const header = new Header(token);

  return useQuery(["UserInfo"], async () => {
    const data = await AxiosTryCatch(async () =>
      axios.get(`${baseURL}/user/book`, header)
    );
    // console.log(data);
    const result = UserInfoSchema.safeParse(data.result);
    if (result.success) {
      return result.data;
    }
    if (data.Status === false) return false;

    console.log(result.error.format());
    return undefined;
  });
};

export const usePostBook = async (
  body: PostBook,
  token: string
): Promise<AxiosResponse<any, any>> => {
  const header = new Header(token);

  return axios
    .post(`${baseURL}/user/book`, body, header)
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};
