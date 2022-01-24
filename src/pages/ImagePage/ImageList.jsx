import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import toast, { Toaster } from "react-hot-toast";

import imageIcon from "assets/icons/image.svg";
import ellipsisIcon from "assets/icons/ellipsis-horizontal-outline.svg";
import linkIcon from "assets/icons/link-outline.svg";
import shareIcon from "assets/icons/share-social-outline.svg";
import manageAccessIcon from "assets/icons/people-outline.svg";
import cloudDownloadIcon from "assets/icons/cloud-download-outline.svg";
import heartIcon from "assets/icons/heart-outline.svg";
import renameIcon from "assets/icons/pencil-outline.svg";
import DeleteIcon from "assets/icons/trash-outline.svg";

import { Dialog, Checkbox } from "@mui/material";

import formateBytes from "utils/formatBytes";

const ImageList = ({ imageDetails, handleDelete }) => {
   const [isOpenShowImageDialog, setIsOpenShowImageDialog] = useState(false);
   const [isOpenMenuImageId, setIsOpenMenuImageId] = useState("");
   const [isOpenMenuDropdown, setIsOpenMenuDropdown] = useState(false);
   const dropdownRef = useRef(null);

   const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
         setIsOpenMenuDropdown(false);
      }
   };

   useEffect(() => {
      document.addEventListener("click", handleClickOutside, true);
      return () => {
         document.removeEventListener("click", handleClickOutside, true);
      };
   });

   const handleCloseMenuDropdown = () => {
      setIsOpenMenuDropdown(false);
   };

   console.log(isOpenMenuImageId);
   return (
      <>
         <div className="flex items-center justify-between py-2 border-b px-3 xl:px-0 hover:bg-gray-100">
            <div className="flex items-center space-x-2 w-full cursor-pointer">
               <div>
                  <img className="w-7 xl:w-10" src={imageIcon} alt="" />
               </div>
               <div onClick={() => setIsOpenShowImageDialog(true)}>
                  <div className="text-tiny xl:text-base font-medium">
                     {imageDetails.fileName}
                  </div>
                  <div className="text-xs xl:text-sm text-gray-400">
                     {moment(imageDetails.date).format("MMM Do YY")},&nbsp;
                     {formateBytes(imageDetails.fileSize)}
                  </div>
               </div>
            </div>
            <div className="flex items-center">
               <Checkbox />

               <div className="relative">
                  <button
                     onClick={() => {
                        setIsOpenMenuDropdown(true);
                        setIsOpenMenuImageId(imageDetails._id);
                     }}
                     className="p-1 mr-2 hover:bg-gray-200 rounded-md"
                  >
                     <img className="w-8" src={ellipsisIcon} alt="" />
                  </button>
                  {isOpenMenuDropdown &&
                     isOpenMenuImageId === imageDetails._id && (
                        <div
                           ref={dropdownRef}
                           onMouseLeave={() => {
                              setIsOpenMenuDropdown(false);
                              setIsOpenMenuImageId("");
                           }}
                           className="origin-top-right z-50 absolute right-0 mt-2 w-64 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                        >
                           <div className="">
                              <button
                                 onClick={() => {
                                    navigator.clipboard.writeText(
                                       imageDetails.fileUrl,
                                    );
                                    handleCloseMenuDropdown();
                                    toast.success("Copy file Url");
                                 }}
                                 className="flex border-b px-3 py-2 hover:bg-gray-200 w-full pb-2 items-center space-x-2"
                              >
                                 <img className="w-6" src={linkIcon} alt="" />
                                 <span className="text-tiny xl:text-base">
                                    Copy Link
                                 </span>
                              </button>
                              <button
                                 disabled
                                 className="flex border-b px-3 cursor-not-allowed w-full hover:bg-gray-200 py-2 items-center space-x-2"
                              >
                                 <img className="w-6" src={shareIcon} alt="" />
                                 <span className="text-tiny xl:text-base">
                                    Share
                                 </span>
                              </button>
                              <button
                                 disabled
                                 className="flex border-b px-3 cursor-not-allowed w-full hover:bg-gray-200 py-2 items-center space-x-2"
                              >
                                 <img
                                    className="w-6"
                                    src={manageAccessIcon}
                                    alt=""
                                 />
                                 <span className="text-tiny xl:text-base">
                                    Manage Accessk
                                 </span>
                              </button>
                              <button className="flex border-b px-3 cursor-not-allowed w-full hover:bg-gray-200 py-2 items-center space-x-2">
                                 <img
                                    className="w-6"
                                    src={cloudDownloadIcon}
                                    alt=""
                                 />
                                 <span className="text-tiny xl:text-base">
                                    Make Available Offline
                                 </span>
                              </button>
                              <button
                                 disabled
                                 className="flex border-b px-3 cursor-not-allowed w-full hover:bg-gray-200 py-2 items-center space-x-2"
                              >
                                 <img className="w-6" src={heartIcon} alt="" />
                                 <span className="text-tiny xl:text-base">
                                    Add to Favorites
                                 </span>
                              </button>
                              <button
                                 disabled
                                 className="flex px-3 w-full pb-2 cursor-not-allowed hover:bg-gray-200 py-2 items-center space-x-2"
                              >
                                 <img className="w-6" src={renameIcon} alt="" />
                                 <span className="text-tiny xl:text-base">
                                    Rename
                                 </span>
                              </button>
                              <button
                                 onClick={() => {
                                    handleDelete(imageDetails._id);
                                    setIsOpenMenuImageId("");
                                    setIsOpenMenuDropdown(false);
                                 }}
                                 className="flex px-3 w-full pb-2 hover:bg-gray-200 py-2 items-center space-x-2"
                              >
                                 <img className="w-6" src={DeleteIcon} alt="" />
                                 <span className="text-tiny xl:text-base">
                                    Delete
                                 </span>
                              </button>
                           </div>
                        </div>
                     )}
               </div>
            </div>
         </div>

         {isOpenShowImageDialog && (
            <Dialog
               open={isOpenShowImageDialog}
               onClose={() => setIsOpenShowImageDialog(false)}
            >
               <img src={imageDetails.fileUrl} alt="" />
            </Dialog>
         )}
         <Toaster />
      </>
   );
};

ImageList.propTypes = {
   imageDetails: PropTypes.object,
   handleDelete: PropTypes.func,
};

export default ImageList;
