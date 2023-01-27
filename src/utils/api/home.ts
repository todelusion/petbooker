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
    const instance = axios.create();
    axiosMiddleware(instance);
    return instance
      .post(`${baseURL}/hotel/hotelFilter`, body)
      .then((res) => {
        const result = HotelListSchema.safeParse(res.data);
        if (result.success) {
          return result.data;
        }
        return undefined;
      })
      .catch((err) => {
        console.log(err);
        throw new Error(err);
      });
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
