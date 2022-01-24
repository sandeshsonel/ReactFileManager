import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// import ellipsisIcon from "assets/icons/ellipsis-horizontal-outline.svg";
import refreshIcon from "assets/icons/refresh-outline.svg";
import imageGalleryIcon from "assets/images/image-gallery.png";

import SearchFile from "components/SearchFile";
import { LinearProgress } from "@mui/material";

import { getUserImagesListApi, deleteUserImageApi } from "requests/fileManager";
import toast, { Toaster } from "react-hot-toast";
import ImageList from "./ImageList";

const ImagePage = (props) => {
   const [imageLists, setImageLists] = useState([]);
   const [isLoading, setIsLoading] = useState(false);
   const [searchImage, setSearchImage] = useState("");

   const getUserImagesList = async () => {
      setIsLoading(true);
      const result = await props.getUserImagesListApi();
      setIsLoading(false);
      if (!result.error) {
         setImageLists(result.data);
      } else {
         toast.error(
            <div className="text-tiny xl:text-base">{result.message}</div>,
         );
      }
   };

   const deleteUserImage = async (fileId) => {
      setIsLoading(true);
      const result = await props.deleteUserImageApi(fileId);

      if (!result.error) {
         setImageLists(result.data);
         setIsLoading(false);
      } else {
         toast.error(result.message);
         setIsLoading(false);
      }
   };

   useEffect(() => {
      getUserImagesList();
   }, []);

   console.log(imageLists);

   const filterImages = () => {
      let temp = imageLists;

      if (searchImage !== "") {
         temp = temp.filter((d) =>
            d.fileName.toLowerCase().includes(searchImage.toLowerCase()),
         );
      }

      return temp;
   };

   return (
      <div>
         {isLoading && <LinearProgress />}
         <div className="mt-3 px-3 xl:px-0">
            <div className="flex items-center justify-between ">
               <div className="text-lg xl:text-xl font-medium">Images</div>
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
                  <button className="flex items-center justify-center space-x-1 rounded-sm text-tiny font-medium bg-gray-200 w-24 py-1">
                     <span>Folder</span>
                     <div>
                        <svg
                           xmlns="http://www.w3.org/2000/svg"
                           className="w-5"
                           viewBox="0 0 512 512"
                        >
                           <title>Add</title>
                           <path
                              fill="none"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="32"
                              d="M256 112v288M400 256H112"
                           />
                        </svg>
                     </div>
                  </button>
               </div>
               {/* {imageLists.length > 0 && (
                  <button className="p-1 border hover:bg-gray-200 rounded-md">
                     <img className="w-5" src={ellipsisIcon} alt="" />
                  </button>
               )} */}
            </div>
            <div className="mt-3">
               <SearchFile
                  name="searchImage"
                  value={searchImage}
                  handleChange={(e) => setSearchImage(e.target.value)}
                  handleClear={() => setSearchImage("")}
               />
            </div>
         </div>

         {!isLoading && imageLists.length > 0 ? (
            <div className="mt-2">
               {filterImages().map((image, idx) => (
                  <ImageList
                     key={idx}
                     imageDetails={image}
                     handleDelete={deleteUserImage}
                  />
               ))}
            </div>
         ) : !isLoading && !imageLists.length ? (
            <div className="center">
               <img
                  className="w-12 h-12 m-auto"
                  src={imageGalleryIcon}
                  alt=""
               />
               <div className="mt-3 text-gray-400 font-medium text-tiny xl:text-base">
                  No Image Found
               </div>
               <div className="mt-3 flex justify-center">
                  <button
                     onClick={getUserImagesList}
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

         <Toaster />
      </div>
   );
};

ImagePage.propTypes = {
   getUserImagesListApi: PropTypes.func,
   deleteUserImageApi: PropTypes.func,
};

const mapStateToProps = () => ({});

const mapDispatchToProps = {
   getUserImagesListApi,
   deleteUserImageApi,
};

export default connect(mapStateToProps, mapDispatchToProps)(ImagePage);
