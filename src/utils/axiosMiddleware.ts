import { AxiosInstance } from "axios";

const axiosMiddleware = (instance: AxiosInstance): void => {
  instance.interceptors.response.use(
    (response) => {
      console.log(response);
      return response;
    },
    async (error) => {
      console.log(error);
      return Promise.reject(error);
    }
  );
};

export default axiosMiddleware;
