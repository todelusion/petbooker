const baseURL = "https://petcity.rocket-coding.com";

const toFormData = (file: File): FormData => {
  const formdata = new FormData();
  formdata.append("Image", file);

  return formdata;
};

export { toFormData, baseURL };
