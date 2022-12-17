/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AxiosTryCatch, baseURL } from "..";
import { Pet, PetListSchema } from "../../types/schema";
import Header from "./Header";

export const usePetCardList = (token: string) =>
  useQuery(["PetCardList"], async () => {
    const header = new Header(token);
    const data = await AxiosTryCatch(async () =>
      axios.get(`${baseURL}/petcard/petcardlist`, header)
    );
    console.log(data.petCardList);
    if (data.Status === false) {
      throw new Error("GET request error in usePetCardList");
    }
    const result = PetListSchema.safeParse(data.petCardList);
    if (result.success) {
      return result.data;
    }
    console.log(result.error.format());
    return undefined;
  });

export const postPet = async (body: Pet, token: string) => {
  const header = new Header(token);
  const data = await AxiosTryCatch(async () =>
    axios.post(`${baseURL}/petcard`, body, header)
  );
  console.log(data);
};
export const postPetPhoto = async (body: FormData, token: string) => {
  const header = new Header(token);
  const data = await AxiosTryCatch(async () =>
    axios.post(`${baseURL}/petcard/uploadpetphoto`, body, header)
  );
  console.log(data);
};
