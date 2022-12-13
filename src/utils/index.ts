import { AxiosResponse } from "axios";

export const baseURL = "https://petcity.rocket-coding.com";

export const toFormData = (file: File): FormData => {
  const formdata = new FormData();
  formdata.append("Image", file);

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
    const res = await callback();
    return res.data;
  } catch (error) {
    console.error(error);
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
    console.error(error);
    return defaultValue;
  }
};
