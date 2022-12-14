/* eslint-disable @typescript-eslint/explicit-function-return-type */
import axios, { AxiosResponse} from "axios";
import { useQuery } from "@tanstack/react-query";
import Header from "./Header";
import { AxiosTryCatch, baseURL } from "../index";
import { POSTRoom, RoomListSchema } from "../../types/schema";

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
  body: POSTRoom,
  token: string
): Promise<AxiosResponse<any, any>> => {
  const header = new Header(token);

  return axios
    .post(`${baseURL}/hotel/room`, body, header)
    .then((res) => {
   
      return res;
    })
    .catch((err) => {
     
      return err;
    });
};

export const putRoom = async (
  id: number,
  body: POSTRoom,
  token: string
): Promise<AxiosResponse<any, any>> => {
  const header = new Header(token);
  return axios
    .put(`${baseURL}/hotel/room?roomId=${id}`, body, header)
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
      const data = await AxiosTryCatch(async () =>
        axios.get(`${baseURL}/hotel/room/list`, header)
      );
      const result = RoomListSchema.safeParse(data.rooms);
      if (result.success) {
        return result.data;
      }
     
      return undefined;
    },
  
  );
};
