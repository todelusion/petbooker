import { AxiosResponse } from "axios";
import {
  serviceLists,
  facilitiesLists,
  specialsLists,
} from "../containers/Filter/data";

export const baseURL = "https://petcity.rocket-coding.com";

export const parseServiceTypes = (
  ServiceTypes: string[]
): {
  Services: string[];
  Facilities: string[];
  Specials: string[];
} => {
  const servicesInputValue = [...serviceLists.contents].map((obj) => obj.value);
  const facilitiesInputValue = [...facilitiesLists.contents].map(
    (obj) => obj.value
  );
  const specialsInputValue = [...specialsLists.contents].map(
    (obj) => obj.value
  );

  const Services = ServiceTypes.filter((item) =>
    servicesInputValue.includes(item)
  );

  const Facilities = ServiceTypes.filter((item) =>
    facilitiesInputValue.includes(item)
  );

  const Specials = ServiceTypes.filter((item) =>
    specialsInputValue.includes(item)
  );

  return {
    Services,
    Facilities,
    Specials,
  };
};

export const toFormData = (key: string, file: File): FormData => {
  const formdata = new FormData();
  formdata.append(key, file);

  return formdata;
};

export const assertIsError = (err: unknown): Error => {
  if (!(err instanceof Error)) {
    throw err;
  }
  return err;
};

export const AxiosTryCatch = async <T>(
  callback: () => Promise<AxiosResponse<T>>
): Promise<T | undefined> => {
  try {
    console.log("fetcing");
    const res = await callback();
    console.log(res);
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

export const tryCatch = async <T>(
  callback: () => Promise<T>,
  defaultValue?: T
): Promise<T | undefined> => {
  try {
    return await callback();
  } catch (error) {
    return defaultValue;
  }
};

export const createFile = async (url: string): Promise<File> => {
  const result = url.replace(
    "https://petcity.rocket-coding.com/upload/profile/",
    ""
  );
  const response = await fetch(url);
  const data = await response.blob();
  const metadata = {
    type: "image/jpeg",
  };
  const file = new File([data], result, metadata);
  return file;
};
