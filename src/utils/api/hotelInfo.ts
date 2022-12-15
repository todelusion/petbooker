/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable import/prefer-default-export */
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { baseURL } from "..";
import { HotelInfoSchema } from "../../types/schema";
import Header from "./Header";

// const fetchHotelInfo =async(url:string,token:string)=>{
//  return useQuery(["Info"], async () => {
//   const response = await axios.get(url, {
//     headers: { Authorization: `Bearer ${token}` },
//   });
//   return HotelInfoSchema.parse(response.data.result);
// });}

export const useHotelInfo = (token: string) => {
  const header = new Header(token);

  return useQuery(
    ["Info"],
    async () => {
      const response = await axios.get(`${baseURL}/hotel`, header);
      return HotelInfoSchema.parse(response.data.result);
    },
    {
      onError: (err) => console.log("useHotelInfo錯誤", err),
    }
  );
};
