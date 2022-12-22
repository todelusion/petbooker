/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable import/prefer-default-export */
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { baseURL } from "..";
import { customerInfoSchema} from "../../types/schema";
import Header from "./Header";



export const useCustormerInfo = (token: string) => {
  const header = new Header(token);

  return useQuery(
    ["custormerInfo"],
    async () => {
      const response = await axios.get(`${baseURL}/user`, header);
      return customerInfoSchema.parse(response.data.result);
    },
 
  );
};
