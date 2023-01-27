import axios from "axios";

const axiosMiddleware = (): void => {
  axios.interceptors.response.use(
    (response) => response,
    async (error) => {
      await Promise.reject(error);
    }
  );
};

export default axiosMiddleware;
