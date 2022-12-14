/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable import/prefer-default-export */
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  Filter,
  Hotel,
  HotelListSchema,
  HotelSchema,
} from "../../types/schema";
import { AxiosTryCatch, baseURL } from "../index";

export const useHotelList = (body: Filter) =>
  useQuery(["HotelList"], async () => {
    console.log("in useHotelList Hooks", body);
    const res = await axios.post(`${baseURL}/hotel/hotelFilter`, body);
    console.log(res);
    const result = HotelListSchema.safeParse(res.data);
    if (result.success) {
      return result.data;
    }
    console.log(result.error.format());
    return undefined;
  });

export const useHotel = (id: string) =>
  useQuery(["Hotel"], async () => {
    const data = await AxiosTryCatch<Hotel>(async () =>
      axios.get(`${baseURL}/hotel/hotelInfo?hotelId=${id}`)
    );
    // console.log(data);
    const result = HotelSchema.safeParse(data);
    if (result.success) {
      return result.data;
    }
    console.log(result.error.format());
    return undefined;
  });