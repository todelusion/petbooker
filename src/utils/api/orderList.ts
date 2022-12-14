import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { baseURL } from "..";
import { OrderListSchema } from "../../types/schema";
import Header from "./Header";



export const useOrderList = (token: string) => {
  const header = new Header(token);

  return useQuery(
    ["Order"],
    async () => {
      const response = await axios.get(`${baseURL}/reservedList`, header);
      return OrderListSchema.parse(response.data.result);
    },
    {
      onError: (err) => console.log("useOrderList錯誤", err),
    }
  );
};