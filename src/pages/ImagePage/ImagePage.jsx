import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import ellipsisIcon from "assets/icons/ellipsis-horizontal-outline.svg";
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
               {imageLists.length > 0 && (
                  <button className="p-1 border hover:bg-gray-200 rounded-md">
                     <img className="w-5" src={ellipsisIcon} alt="" />
                  </button>
               )}
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
