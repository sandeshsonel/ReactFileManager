import axios from "axios";
import { store } from "store";

const token = store.getState().account.token;

const axiosInstance = axios.create({
   headers: {
      authorization: `Bearer ${token}`,
   },
});

export default axiosInstance;
