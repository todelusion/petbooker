/* eslint-disable @typescript-eslint/explicit-function-return-type */
import axios, { AxiosResponse, AxiosStatic } from "axios";
import { useQuery } from "@tanstack/react-query";
import Header from "./Header";
import { baseURL } from "../index";
import { TPostRoomSchema, RoomListSchema } from "../../types/schema";

export const uploadRoomPhoto = async (
  id: number,
  formdata: FormData,
  token: string
): Promise<AxiosResponse<any, any>> => {
  const header = new Header(token);

  return axios
    .post(`${baseURL}/hotel/uploadroomphoto?roomId=${id}`, formdata, header)
    .then((res) => res)
    .catch((err) => err);
};

export const postRoom = async (
  body: TPostRoomSchema,
  token: string
): Promise<AxiosResponse<any, any>> => {
  const header = new Header(token);

  return axios
    .post(`${baseURL}/hotel/room`, body, header)
    .then((res) => res)
    .catch((err) => err);
};
export const deleteRoom = async (
  id: number,
  token: string
): Promise<AxiosResponse<any, any>> => {
  const header = new Header(token);
  return axios
    .delete(`${baseURL}/hotel/room?roomId=${id}`, header)
    .then((res) => res)
    .catch((err) => err);
};

export const useRoomList = (token: string) => {
  const header = new Header(token);

  return useQuery(
    ["RoomList"],
    async () => {
      const res = await axios.get(`${baseURL}/hotel/room/list`, header);
      console.log(res.data);
      return RoomListSchema.parse(res.data.roomList);
    },
    {
      onError: (err) => console.log("GETRoomList錯誤", err),
    }
  );
};
