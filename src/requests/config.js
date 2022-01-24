export const baseUrl = "http://localhost:8000";

export const loginUrl = `${baseUrl}/api/v1/user/login`;
export const loginWithFirebaseUrl = `${baseUrl}/api/v1/user/login/firebase`;
export const signUpUrl = `${baseUrl}/api/v1/user/signup`;

export const postUploadFileUrl = `${baseUrl}/api/v1/upload`;
export const getUserImagesListUrl = `${baseUrl}/api/v1/images`;
export const getUserImageUrl = `${baseUrl}/api/v1/images`;
export const postAddUserImageUrl = `${baseUrl}/api/v1/images`;
export const deleteUserImageUrl = (fileId) =>
   `${baseUrl}/api/v1/images/fileId/${fileId}`;
export const updateUserImageNameUrl = `${baseUrl}/api/v1/images`;

export const folderListByFolderTypeUrl = (folderType) =>
   `${baseUrl}/api/v1/folder/${folderType}`;
export const getFolderFilesUrl = (folderType, folderId) =>
   `${baseUrl}/api/v1/folder/${folderType}/${folderId}`;
