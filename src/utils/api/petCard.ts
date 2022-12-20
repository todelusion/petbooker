/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AxiosTryCatch, baseURL } from "..";
import {
  Pet,
  PetListSchema,
  postPetResSchema,
  PetSchema,
  PetCard,
} from "../../types/schema";
import Header from "./Header";

export const usePetList = (token: string) =>
  useQuery(["PetList"], async () => {
    const header = new Header(token);
    const data = await AxiosTryCatch(async () =>
      axios.get(`${baseURL}/petcard/petcardlist`, header)
    );
    // console.log(data);
    if (data.Status === false) {
      console.error("GET request error in usePetCardList");
    }
    const result = PetListSchema.safeParse(data.petCardList);
    if (result.success) return result.data;

    console.error(result.error);
    return undefined;
  });

export const postPet = async (body: PetCard, token: string) => {
  const header = new Header(token);
  const data = await AxiosTryCatch(async () =>
    axios.post(`${baseURL}/petcard`, body, header)
  );
  if (data.Status === false) {
    console.error("API error in postPet");
  }

  const result = postPetResSchema.safeParse(data.result);
  if (result.success) return result.data;

  console.error(result.error);
  return undefined;
};
export const putPet = async (petid: number, body: PetCard, token: string) => {
  // console.log(petid);
  const header = new Header(token);
  const data = await AxiosTryCatch(async () =>
    axios.put(`${baseURL}/petcard?petCardId=${petid}`, body, header)
  );

  if (data.Status === false) {
    console.error("API error in putPet");
    return undefined;
  }
  return data;
};
export const deletePet = async (petid: number, token: string) => {
  const header = new Header(token);
  // console.log(petid, header);
  const data = await AxiosTryCatch(async () =>
    axios.delete(`${baseURL}/petcard?petCardId=${petid}`, header)
  );
  // console.log(data);

  if (data.Status === false) {
    console.error("API error in deletePet");
    return undefined;
  }
  return data;
};
export const postPetPhoto = async (
  petid: number,
  body: FormData,
  token: string
) => {
  const header = new Header(token);
  const data = await AxiosTryCatch<{
    Status: boolean;
    Data: { FileName: string };
  }>(async () =>
    axios.post(
      `${baseURL}/petcard/uploadpetphoto?petCardId=${petid}`,
      body,
      header
    )
  );
  return data;
};

export const usePetCard = (id: number) =>
  useQuery(
    ["PetcardInfo"],
    async () => {
      const response = await axios.get(
        `${baseURL}/petcard/order?petCardId=${id}`
      );
      return PetSchema.parse(response.data.result);
    },
    {
      onError: (err) => console.log("usePetCard錯誤", err),
    }
  );
