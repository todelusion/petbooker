/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable import/prefer-default-export */
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { baseURL } from "..";
import { PetSchema } from "../../types/schema";




export const usePetCard = (id:number) => useQuery(
    ["PetcardInfo"],
    async () => {
      const response = await axios.get(`${baseURL}/petcard/order?petCardId=${id}`);
      return PetSchema.parse(response.data.result);
    },
    {
      onError: (err) => console.log("usePetCard錯誤", err),
    }
  );
