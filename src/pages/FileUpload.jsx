import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import toast, { Toaster } from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";

import jpgImage from "assets/images/image.png";
import mp3Image from "assets/images/mp3.png";
import mp4Image from "assets/images/mp4.png";
import pdfImage from "assets/images/pdf.png";

import LinearProgress from "@mui/material/LinearProgress";

import {
   addUploadFile,
   deleteUploadFile,
   setIsUploadFile,
   resetFileManagerState,
} from "store/actions/fileManager";
import { postUploadUserFileApi } from "requests/fileManager";
import formateBytes from "utils/formatBytes";

const fileUploadOption = {
   mp3: {
      fileExt: "mp3",
      fileImage: mp3Image,
   },
   jpg: {
      fileExt: "jpg",
      fileImage: jpgImage,
   },
   png: {
      fileExt: "png",
      fileImage: jpgImage,
   },
   pdf: {
      fileExt: "pdf",
      fileImage: pdfImage,
   },
   mp4: {
      fileExt: "mp4",
      fileImage: mp4Image,
   },
};

class FileUpload extends Component {
   constructor(props) {
      super(props);

      if (window.performance) {
         if (performance.navigation.type == 1) {
            this.props.resetFileManagerState();
         }
      }

      this.state = {};
   }

   componentWillUnmount() {
      this.props.resetFileManagerState();
   }

   handleChangeFileUpload = (e) => {
      const file = e.target.files[0];
      const fileExt = file.name.split(".").pop();
      console.log(file, fileExt, toast);
      if (!fileUploadOption[fileExt]) {
         return toast.error(
            <div className="text-tiny xl:text-base">
               Please select jpg, png, mp3, mp4, pdf files
            </div>,
         );
      }

      const fileSize = formateBytes(file.size);
      console.log(fileSize);
      this.props.addUploadFile({
         id: uuidv4(),
         fileName: file.name,
         fileType: fileExt,
         fileSize,
         file,
      });
   };

   handleSubmitFileUpload = async (fileId) => {
      const uploadFile = this.props.uploadFiles.find(
         (file) => file.id === fileId,
      );
      this.props.setIsUploadFile(fileId, true);
      // setSelectFiles(
      //    selectFiles.map((f, idx) =>
      //       idx === fileIdx ? { ...f, isUpload: true } : f,
      //    ),
      // );
      let form = new FormData();
      form.append("file", uploadFile.file);
      form.append("fileName", uploadFile.fileName);
      form.append("fileType", uploadFile.fileType);
      const result = await this.props.postUploadUserFileApi(form, fileId);
      if (!result.error) {
         // setSelectFiles(
         //    selectFiles.map((f, idx) =>
         //       idx === fileIdx ? { ...f, isUploadStatus: "Success" } : f,
         //    ),
         // );
      } else {
         // setSelectFiles(
         //    selectFiles.map((f, idx) =>
         //       idx === fileIdx ? { ...f, isUploadStatus: "Failed" } : f,
         //    ),
         // );
      }
   };

   // const handleFileNameChange = (e, fileIdx) => {
   //    console.log(e, fileIdx);
   //    setSelectFiles(
   //       selectFiles.map((file, idx) =>
   //          idx === fileIdx ? { ...file, fileName: e.target.value } : file,
   //       ),
   //    );
   // };

   // const handleRemoveFile = (fileName) => {
   //    props.deleteUploadFile();
   //    setSelectFiles(selectFiles.filter((file) => file.fileName !== fileName));
   // };

   render() {
      console.log(this.props);
      return (
         <div>
            <div className="flex items-center justify-between mt-1 py-2 px-3 xl:px-0 pb-3 border-b">
               <div className="text-tiny xl:text-base font-medium">
                  Upload Files
               </div>
               <label className="bg-gray-200 px-2 py-1 text-tiny rounded-sm font-medium cursor-pointer">
                  Select File
                  <input
                     onChange={this.handleChangeFileUpload}
                     type="file"
                     className="hidden"
                  />
               </label>
            </div>

            {this.props.uploadFiles.length > 0 &&
               this.props.uploadFiles.map((file, idx) => (
                  <div
                     key={idx}
                     className="px-2 xl:px-0 mt-4 border-b border-gray-200 pb-3"
                  >
                     <div className="flex items-start space-x-2">
                        <div className="w-6 h-6">
                           <img
                              className="w-6 xl:w-14"
                              src={fileUploadOption[file.fileType].fileImage}
                              alt=""
                           />
                        </div>
                        <div className="space-y-3 w-full pr-2 xl:pr-0">
                           <div className="flex items-center justify-between">
                              {this.state.isFileNameUpdate === idx ? (
                                 <div className="flex items-center justify-between">
                                    <input
                                       name="fileName"
                                       value={file.fileName}
                                       // onChange={(e) =>
                                       //    handleFileNameChange(e, idx)
                                       // }
                                       className="outline-none focus:outline-none text-tiny xl:text-base font-medium"
                                       type="text"
                                    />
                                 </div>
                              ) : (
                                 <div
                                    //  onClick={() => setIsFileNameUpdate(idx)}
                                    className="text-sm xl:text-tiny font-medium w-1/2 truncate"
                                 >
                                    {file.fileName}
                                 </div>
                              )}
                              <div className="text-sm xl:text-tiny font-medium">
                                 {file.fileSize}
                              </div>
                              <div className="flex items-center space-x-1">
                                 {file.isUpload && file.isUploadStatus && (
                                    <button
                                       // onClick={() =>
                                       //    handleRemoveFile(file.fileName)
                                       // }
                                       className={`${
                                          file.isUploadStatus === "Success"
                                             ? "bg-green-600"
                                             : "bg-red-600"
                                       }text-white px-2 py-1 text-xs xl:text-sm font-medium rounded-sm`}
                                    >
                                       {file.isUploadStatus}
                                    </button>
                                 )}
                                 {file.isUpload &&
                                    file.uploadProgress != "100" && (
                                       <button
                                          // onClick={() =>
                                          //    handleRemoveFile(file.fileName)
                                          // }
                                          className="text-black bg-gray-300 px-2 py-1 text-xs xl:text-sm font-medium rounded-sm"
                                       >
                                          Cancel
                                       </button>
                                    )}
                                 {!file.isUpload && (
                                    <button
                                       onClick={() =>
                                          this.handleSubmitFileUpload(file.id)
                                       }
                                       className="text-white bg-blue-600 px-2 py-1 text-xs xl:text-sm font-medium rounded-sm"
                                    >
                                       Remove
                                    </button>
                                 )}
                                 {!file.isUpload && (
                                    <button
                                       onClick={() =>
                                          this.handleSubmitFileUpload(file.id)
                                       }
                                       className="text-white bg-blue-600 px-2 py-1 text-xs xl:text-sm font-medium rounded-sm"
                                    >
                                       Upload
                                    </button>
                                 )}
                              </div>
                           </div>
                           <div className="">
                              <LinearProgress
                                 variant="determinate"
                                 value={
                                    file.uploadProgress
                                       ? file.uploadProgress
                                       : 0
                                 }
                              />
                           </div>
                        </div>
                     </div>
                  </div>
               ))}
            <Toaster />
         </div>
      );
   }
}

FileUpload.propTypes = {
   uploadFiles: PropTypes.array,
   postUploadUserFileApi: PropTypes.func,
   addUploadFile: PropTypes.func,
   deleteUploadFile: PropTypes.func,
   setIsUploadFile: PropTypes.func,
   resetFileManagerState: PropTypes.func,
};

const mapStateToProps = (state) => ({
   uploadFiles: state.fileManager.uploadFiles,
});

const mapDispatchToProps = {
   postUploadUserFileApi,
   addUploadFile,
   deleteUploadFile,
   setIsUploadFile,
   resetFileManagerState,
};

export default connect(mapStateToProps, mapDispatchToProps)(FileUpload);
