/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable import/prefer-default-export */
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Filter, HotelListSchema } from "../../types/schema";
import { baseURL } from "../index";

export const useHotelList = (body: Filter) =>
  useQuery(["HotelList"], async () => {
    const res = await axios.post(`${baseURL}/hotel/hotelFilter`, body);
    // console.log(res.data);
    const result = HotelListSchema.safeParse(res.data);
    if (result.success) {
      return result.data;
    }
    console.log(result.error.format());
    return undefined;
  });
