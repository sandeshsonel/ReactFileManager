export const SET_IS_LOADING = "SET_IS_LOADING";
export const SET_IS_OPEN_UPLOAD_FILE_DIALOG = "SET_IS_OPEN_UPLOAD_FILE_DIALOG";
export const ADD_UPLOAD_FILE = "ADD_UPLOAD_FILE";
export const SET_UPLOAD_FILE_PROGRESS = "SET_UPLOAD_FILE_PROGRESS";
export const DELETE_UPLOAD_FILE = "DELETE_UPLOAD_FILE";
export const SET_IS_UPLOAD_FILE = "SET_IS_UPLOAD_FILE";
export const RESET_FILE_MANAGER_STATE = "RESET_FILE_MANAGER_STATE";
export const SET_UPLOAD_FILE_CANCEL_TOKEN = "SET_UPLOAD_FILE_CANCEL_TOKEN";

const initialState = {
   isLoading: false,
   isOpenUploadFileDialog: false,
   uploadFiles: [],
};

const fileManagerReducer = (state = initialState, action) => {
   switch (action.type) {
      case SET_IS_LOADING:
         return {
            ...state,
            isLoading: action.payload,
         };
      case SET_IS_OPEN_UPLOAD_FILE_DIALOG:
         return {
            ...state,
            isOpenUploadFileDialog: !state.isOpenUploadFileDialog,
         };
      case ADD_UPLOAD_FILE:
         return {
            ...state,
            uploadFiles: [...state.uploadFiles, action.payload],
         };
      case SET_UPLOAD_FILE_PROGRESS:
         return {
            ...state,
            uploadFiles: state.uploadFiles.map((file) =>
               file.id === action.payload.fileIdx
                  ? { ...file, uploadProgress: action.payload.progress }
                  : file,
            ),
         };
      case DELETE_UPLOAD_FILE:
         return {
            ...state,
            uploadFiles: state.uploadFiles.filter(
               (file) => file.name !== action.payload.name,
            ),
         };
      case SET_IS_UPLOAD_FILE:
         return {
            ...state,
            uploadFiles: state.uploadFiles.map((file) =>
               file.id === action.payload.fileId
                  ? { ...file, isUpload: action.payload.flag }
                  : file,
            ),
         };
      case SET_UPLOAD_FILE_CANCEL_TOKEN:
         return {
            ...state,
            uploadFiles: state.uploadFiles.map((file) =>
               file.id === action.payload.fileId
                  ? { ...file, cancelToken: action.payload.cancelToken }
                  : file,
            ),
         };
      case RESET_FILE_MANAGER_STATE:
         return initialState;
      default:
         return state;
   }
};

export default fileManagerReducer;
