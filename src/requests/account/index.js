import axiosInstance from "utils/axiosInstance";
import { loginUrl, loginWithFirebaseUrl, signUpUrl } from "../config";
import { setIsLogin, setIsSignUp } from "store/actions/account";

export const postLoginApi = (loginDetails) => async (dispatch) => {
   try {
      const response = await axiosInstance.post(loginUrl, loginDetails);
      console.log(response);
      dispatch(setIsLogin(response.data.data));

      return {
         error: false,
         message: "Login Successfully",
         data: response.data.data,
      };
   } catch (error) {
      console.log(error.response);
      if (error.response.data.status === "0") {
         return {
            error: true,
            message: error.response.data.message,
         };
      } else {
         return {
            error: true,
            message: error.message,
         };
      }
   }
};

export const loginWithFirebaseApi = async (userDetails) => {
   try {
      const response = await axiosInstance.post(
         loginWithFirebaseUrl,
         userDetails,
      );
      return {
         error: false,
         data: response.data.data,
      };
   } catch (error) {
      return {
         error: true,
         message: error.response.message,
      };
   }
};

export const postSignUpApi = (signUpDetails) => async (dispatch) => {
   try {
      const response = await axiosInstance.post(signUpUrl, signUpDetails);
      console.log(response);
      if (response.data.status === "1") {
         dispatch(setIsSignUp(response.data));
         return {
            error: false,
            message: "Sign Up Successfully",
            data: response.data.data,
         };
      } else if (response.data.status === "0") {
         return {
            error: true,
            message: response.data.data.message,
         };
      }
   } catch (error) {
      console.log(error.response);
      if (error.response.data.status === "0") {
         return {
            error: true,
            message: error.response.data.message,
         };
      } else {
         return {
            error: true,
            message: error.message,
         };
      }
   }
};
