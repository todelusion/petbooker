/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AxiosTryCatch, baseURL } from "..";
import {
  PetListSchema,
  postPetResSchema,
  PetSchema,
  PetCard,
  PetCardSchema,
} from "../../types/schema";
import Header from "./Header";

export const usePetList = (token: string) =>
  useQuery(["PetList"], async () => {
    const header = new Header(token);
    const data = await AxiosTryCatch(async () =>
      axios.get(`${baseURL}/petcard/petcardlist`, header)
    );
    
  
    const result = PetListSchema.safeParse(data.petCardList);
    if (result.success) return result.data;

   
    return undefined;
  });

export const postPet = async (body: PetCard, token: string) => {
  const header = new Header(token);
  const data = await AxiosTryCatch(async () =>
    axios.post(`${baseURL}/petcard`, body, header)
  );
 

  const result = postPetResSchema.safeParse(data.result);
  if (result.success) return result.data;

  
  return undefined;
};
export const putPet = async (petid: number, body: PetCard, token: string) => {
 
  const header = new Header(token);
  const data = await AxiosTryCatch(async () =>
    axios.put(`${baseURL}/petcard?petCardId=${petid}`, body, header)
  );
  

  if (data.Status === false) {

    return undefined;
  }
  return data;
};
export const deletePet = async (petid: number, token: string) => {
  const header = new Header(token);
  
  const data = await AxiosTryCatch(async () =>
    axios.delete(`${baseURL}/petcard?petCardId=${petid}`, header)
  );
  

  if (data.Status === false) {
 
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

export const usePetCard = (id: number, token: string) =>
  useQuery(["PetcardInfo"], async () => {
    const header = new Header(token);
    const response = await axios.get(
      `${baseURL}/petcard?petCardId=${id}`,
      header
    );

    const result = PetCardSchema.safeParse(response.data.result);
    if (result.success) return result.data;

   
    return undefined;
  });

export const usePetCardNotToken = (id: number) =>
  useQuery(["PetcardInfoNoToken"], async () => {
    const response = await axios.get(
      `${baseURL}/petcard/order?petCardId=${id}`
    );

    const result = PetSchema.safeParse(response.data.result);
    if (result.success) return result.data;

   
    return undefined;
  });
