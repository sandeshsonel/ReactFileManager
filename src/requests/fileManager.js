import axiosInstance from "../utils/axiosInstance";
import {
   postUploadFileUrl,
   getUserImagesListUrl,
   getUserImageUrl,
   deleteUserImageUrl,
   updateUserImageNameUrl,
} from "./config";

import { setFileUploadProgress } from "store/actions/fileManager";

// let CancelToken = axios.CancelToken;

export const postUploadUserFileApi =
   (fileDetails, fileId) => async (dispatch) => {
      console.log(fileDetails);
      try {
         const response = await axiosInstance.post(
            postUploadFileUrl,
            fileDetails,
            {
               onUploadProgress: (progressEvent) => {
                  const percentCompleted = Math.round(
                     (progressEvent.loaded * 100) / progressEvent.total,
                  );
                  dispatch(setFileUploadProgress(fileId, percentCompleted));
               },
            },
         );
         console.log(response);

         return {
            error: false,
            message: "Add User Image Successfully",
         };
      } catch (error) {
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

export const getUserImagesListApi = () => async () => {
   try {
      const response = await axiosInstance.get(getUserImagesListUrl);
      console.log(response);

      if (response.data.status === "1") {
         return {
            error: false,
            message: response.data.message,
            data: response.data.data,
         };
      }

      if (response.data.status === "0") {
         return {
            error: false,
            message: response.data.message,
         };
      }
   } catch (error) {
      if (error.response.status === "0") {
         return {
            error: true,
            message: error.response.data.message,
         };
      }
      return {
         error: true,
         message: error.message,
      };
   }
};

export const getUserImageApi = () => async () => {
   try {
      const response = await axiosInstance.get(getUserImageUrl);
      console.log(response);

      return {
         error: false,
         message: "Get User Image Successfully",
      };
   } catch (error) {
      return {
         error: true,
         message: "Get User Image Failed",
      };
   }
};

export const deleteUserImageApi = (fileId) => async () => {
   try {
      const response = await axiosInstance.delete(deleteUserImageUrl(fileId));
      console.log(response);
      if (response.data.status === "1") {
         return {
            error: false,
            message: "Delete User Image Successfully",
            data: response.data.data,
         };
      }
      if (response.data.status === "0") {
         return {
            error: false,
            message: "Delete User Image Successfully",
            data: response.data.data,
         };
      }
   } catch (error) {
      if (error.response.data.status === "0") {
         return {
            error: true,
            message: error.response.data.message,
         };
      }
      return {
         error: false,
         message: error.message,
      };
   }
};

export const updateUserImageNameApi = () => async () => {
   try {
      const response = await axiosInstance.patch(updateUserImageNameUrl);
      console.log(response);

      return {
         error: false,
         message: "Update User Images Name Successfully",
      };
   } catch (error) {
      return {
         error: true,
         message: "Update User Image Name Failed",
      };
   }
};
