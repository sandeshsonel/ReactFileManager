import axiosInstance from "../utils/axiosInstance";
import {
   postUploadFileUrl,
   getUserImagesListUrl,
   getUserImageUrl,
   deleteUserImageUrl,
   updateUserImageNameUrl,
   folderListByFolderTypeUrl,
} from "./config";

import { setFileUploadProgress } from "store/actions/fileManager";

// let CancelToken = axios.CancelToken;

export const postUploadUserFileApi =
   (fileDetails, fileId) => async (dispatch, getState) => {
      const token = getState().account.isLoginWithGoogle
         ? getState().account.token.accessToken
         : getState().account.token;
      try {
         const response = await axiosInstance.post(
            postUploadFileUrl,
            fileDetails,
            {
               headers: {
                  authorization: `Bearer ${token}`,
               },
            },
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

export const getUserImagesListApi = () => async (dispatch, getState) => {
   try {
      const token = getState().account.isLoginWithGoogle
         ? getState().account.token.accessToken
         : getState().account.token;

      const response = await axiosInstance.get(getUserImagesListUrl, {
         headers: {
            authorization: `Bearer ${token}`,
         },
      });
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

export const getUserImageApi = () => async (dispatch, getState) => {
   try {
      const token = getState().account.isLoginWithGoogle
         ? getState().account.token.accessToken
         : getState().account.token;
      const response = await axiosInstance.get(getUserImageUrl, {
         headers: {
            authorization: `Bearer ${token}`,
         },
      });
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

export const deleteUserImageApi = (fileId) => async (dispatch, getState) => {
   try {
      const token = getState().account.isLoginWithGoogle
         ? getState().account.token.accessToken
         : getState().account.token;
      const response = await axiosInstance.delete(deleteUserImageUrl(fileId), {
         headers: {
            authorization: `Bearer ${token}`,
         },
      });
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

export const updateUserImageNameApi = () => async (dispatch, getState) => {
   try {
      const token = getState().account.isLoginWithGoogle
         ? getState().account.token.accessToken
         : getState().account.token;

      const response = await axiosInstance.patch(updateUserImageNameUrl, {
         headers: {
            authorization: `Bearer ${token}`,
         },
      });
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

export const postAddNewFolderApi =
   (folderType, folderName) => async (dispatch, getState) => {
      try {
         const token = getState().account.isLoginWithGoogle
            ? getState().account.token.accessToken
            : getState().account.token;

         const response = await axiosInstance.post(
            folderListByFolderTypeUrl(folderType),
            { folderName },
            {
               headers: {
                  authorization: `Bearer ${token}`,
               },
            },
         );
         console.log(response);
         if (response.data.status === "1") {
            return {
               error: false,
               message: response.data.message,
               data: response.data.data,
            };
         } else if (response.data.status === "0") {
            return {
               error: true,
               message: response.data.message,
            };
         }

         return {
            error: false,
            message: response.data.message,
         };
      } catch (error) {
         return {
            error: true,
            message: error.response.message,
         };
      }
   };

export const getFolderListApi = (folderType) => async (dispatch, getState) => {
   try {
      const token = getState().account.isLoginWithGoogle
         ? getState().account.token.accessToken
         : getState().account.token;

      const response = await axiosInstance.get(
         folderListByFolderTypeUrl(folderType),
         {
            headers: {
               authorization: `Bearer ${token}`,
            },
         },
      );
      console.log(response);
      if (response.data.status === "1") {
         return {
            error: false,
            message: response.data.message,
            data: response.data.data,
         };
      }

      return {
         error: false,
         message: "Get Folder List Successfully",
      };
   } catch (error) {
      return {
         error: true,
         message: "Get Folder List Failed",
      };
   }
};

export const getFolderFilesListApi =
   (folderType, folderId) => async (dispatch, getState) => {
      try {
         const token = getState().account.isLoginWithGoogle
            ? getState().account.token.accessToken
            : getState().account.token;
         const response = await axiosInstance.get(
            folderListByFolderTypeUrl(folderType, folderId),
            {
               headers: {
                  authorization: `Bearer ${token}`,
               },
            },
         );
         console.log(response);
         if (response.data.status === "1") {
            return {
               error: false,
               message: response.data.message,
               data: response.data.data,
            };
         } else if (response.data.status === "0") {
            return {
               error: true,
               message: response.data.message,
            };
         }

         return {
            error: false,
            message: "Get Folder List Successfully",
         };
      } catch (error) {
         return {
            error: true,
            message: error.response.message,
         };
      }
   };
