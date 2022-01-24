import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useLocation, useHistory } from "react-router-dom";

import refreshIcon from "assets/icons/refresh-outline.svg";
// import imageGalleryIcon from "assets/images/image-gallery.png";

import SearchFile from "components/SearchFile";

import { setIsLoading } from "store/actions/fileManager";
import { getFolderFilesListApi } from "requests/fileManager";

const FolderDetails = (props) => {
   const location = useLocation();
   const history = useHistory();
   const [folderFiles, setFolderFiles] = useState([]);
   const [searchFile, setSearchFile] = useState("");
   console.log(location);

   const getFolderFiles = async () => {
      props.setIsLoading(true);
      const result = await props.getFolderFilesListApi();
      props.setIsLoading(false);
      if (!result.error) {
         setFolderFiles(result.data);
      }
   };

   useEffect(() => {
      getFolderFiles();
   }, []);

   console.log({ folderFiles, history });

   return (
      <div>
         <div className="mt-3 px-3 xl:px-0">
            <div className="flex items-center justify-between ">
               <div className="font-medium text-tiny xl:text-base">
                  <span onClick={() => history.goBack()} className="capitalize">
                     {location.state.folderType}
                  </span>
                  &nbsp;/&nbsp;
                  <span>{location.state.folderName}</span>
               </div>
               <div className="flex items-center space-x-2">
                  <button className="flex items-center justify-center text-white text-tiny font-medium space-x-2 rounded-sm bg-blue-600 w-24 py-1">
                     <span>Upload</span>
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 text-white"
                        viewBox="0 0 512 512"
                     >
                        <title>Cloud Upload</title>
                        <path
                           d="M320 367.79h76c55 0 100-29.21 100-83.6s-53-81.47-96-83.6c-8.89-85.06-71-136.8-144-136.8-69 0-113.44 45.79-128 91.2-60 5.7-112 43.88-112 106.4s54 106.4 120 106.4h56"
                           fill="none"
                           stroke="currentColor"
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           strokeWidth="32"
                        />
                        <path
                           fill="none"
                           stroke="currentColor"
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           strokeWidth="32"
                           d="M320 255.79l-64-64-64 64M256 448.21V207.79"
                        />
                     </svg>
                  </button>
               </div>
            </div>
            <div className="mt-3">
               <SearchFile
                  value={searchFile}
                  handleChange={(e) => setSearchFile(e.target.value)}
                  handleClear={() => setSearchFile("")}
               />
            </div>
         </div>
         {!props.isLoading && folderFiles.length > 0 ? (
            <div></div>
         ) : !props.isLoading && !folderFiles.length ? (
            <div className="center">
               <div className="mt-3 font-medium text-tiny xl:text-base">
                  This folder is empty
               </div>
               <div className="flex justify-center">
                  <button
                     onClick={getFolderFiles}
                     className="p-1 hover:bg-gray-200 inline-block"
                  >
                     <img
                        className="w-7 h-7 mx-auto"
                        src={refreshIcon}
                        alt=""
                     />
                  </button>
               </div>
            </div>
         ) : null}
         <div></div>
      </div>
   );
};

FolderDetails.propTypes = {
   isLoading: PropTypes.bool.isRequired,
   setIsLoading: PropTypes.func,
   getFolderFilesListApi: PropTypes.func,
};

const mapStateToProps = (state) => ({
   isLoading: state.fileManager.isLoading,
});

const mapDispatchToProps = {
   setIsLoading,
   getFolderFilesListApi,
};

export default connect(mapStateToProps, mapDispatchToProps)(FolderDetails);
