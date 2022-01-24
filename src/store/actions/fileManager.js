import {
   SET_IS_OPEN_UPLOAD_FILE_DIALOG,
   ADD_UPLOAD_FILE,
   SET_UPLOAD_FILE_PROGRESS,
   DELETE_UPLOAD_FILE,
   SET_IS_UPLOAD_FILE,
   RESET_FILE_MANAGER_STATE,
   SET_UPLOAD_FILE_CANCEL_TOKEN,
   SET_IS_LOADING,
} from "../reducers/fileManager";

export const setIsLoading = (flag) => ({
   type: SET_IS_LOADING,
   payload: flag,
});

export const setIsOpenUploadFileDialog = () => ({
   type: SET_IS_OPEN_UPLOAD_FILE_DIALOG,
});

export const addUploadFile = (file) => ({
   type: ADD_UPLOAD_FILE,
   payload: file,
});

export const deleteUploadFile = (fileId) => ({
   type: DELETE_UPLOAD_FILE,
   payload: fileId,
});

export const setIsUploadFile = (fileId, flag) => ({
   type: SET_IS_UPLOAD_FILE,
   payload: { fileId, flag },
});

export const setFileUploadProgress = (fileIdx, progress) => ({
   type: SET_UPLOAD_FILE_PROGRESS,
   payload: { fileIdx, progress },
});

export const resetFileManagerState = () => ({
   type: RESET_FILE_MANAGER_STATE,
});

export const setUploadFileCancelToken = (fileId, cancelToken) => ({
   type: SET_UPLOAD_FILE_CANCEL_TOKEN,
   payload: { fileId, cancelToken },
});
