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
