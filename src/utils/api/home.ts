/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { format } from "date-fns";
import {
  Filter,
  Hotel,
  HotelListSchema,
  HotelSchema,
} from "../../types/schema";
import axiosMiddleware from "../axiosMiddleware";
import { AxiosTryCatch, baseURL } from "../index";

export const useHotelList = (body: Filter) =>
  useQuery(["HotelList"], async () => {
    try {
      axiosMiddleware();
      const res = await axios.post(`${baseURL}/hotel/hotelFilter`, body);

      const result = HotelListSchema.safeParse(res.data);
      if (result.success) {
        return result.data;
      }
      return undefined;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  });

export const useHotel = (id: string, startDate: Date, endDate: Date) => {
  const start = format(startDate, "yyyy/MM/dd");
  const end = format(endDate, "yyyy/MM/dd");

  return useQuery(["Hotel"], async () => {
    const data = await AxiosTryCatch<Hotel>(async () =>
      axios.get(
        `${baseURL}/hotel/hotelInfo?hotelId=${id}&startDate=${start}&endDate=${end}`
      )
    );

    const result = HotelSchema.safeParse(data);
    if (result.success) {
      return result.data;
    }

    return undefined;
  });
};
