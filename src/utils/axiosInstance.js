import axios from "axios";

const axiosInstance = axios.create({
   // headers: {
   //    authorization: `Bearer ${token}`,
   // },
});

export default axiosInstance;
