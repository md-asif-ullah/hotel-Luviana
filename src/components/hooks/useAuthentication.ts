import axios from "axios";

const axiosInstance = axios.create();

const logOut = async () => {
  try {
    const res = await axios.get("/api/logOut");
    if (res.data.success) {
      return true;
    }
    if (!res.data.success) {
      return false;
    }
  } catch (error) {
    return false;
  }
};

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      try {
        const tokenRefreesh = async () => {
          const res = await axiosInstance.get("/api/refresh-token", {
            withCredentials: true,
          });
          if (res.data.success) {
            return axiosInstance.request(error.config);
          }
          if (!res.data.success) {
            logOut();
            return Promise.reject(error);
          }
        };
        tokenRefreesh();
      } catch (error) {
        logOut();
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
