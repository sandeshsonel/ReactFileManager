import React, { useState } from "react";

import SearchFile from "components/SearchFile";

import { Dialog } from "@mui/material";

const AudioPage = () => {
   const [searchAudio, setSearchAudio] = useState("");
   const [audioName, setAudioName] = useState("");
   const [selectAudio, setSelectAudio] = useState(null);
   const [isOpenSelectAudioDialog, setIsOpenSelectAudioDialog] = useState("");
   const [error, setError] = useState("");

   const handleUploadFile = (e) => {
      console.log(e.target.files);

      const file = e.target.files[0];
      if (file) {
         setSelectAudio(file);
         setAudioName(file.name);
         setIsOpenSelectAudioDialog(true);
      }
   };

   const handleSubmitUploadFile = () => {};
   return (
      <div className="mt-3 px-3 xl:px-0">
         <div className="flex items-center justify-between">
            <div className="text-lg xl:text-xl font-medium">Audio</div>

            <label className="w-16 text-center text-tiny cursor-pointer rounded-md font-medium bg-gray-200 py-1">
               Add
               <input
                  onChange={handleUploadFile}
                  id="hidden-input"
                  type="file"
                  className="hidden"
               />
            </label>
         </div>
         <div className="mt-3">
            <SearchFile
               name="searchImage"
               value={searchAudio}
               handleChange={(e) => setSearchAudio(e.target.value)}
               handleClear={() => setSearchAudio("")}
            />
         </div>

         {isOpenSelectAudioDialog && (
            <Dialog
               open={isOpenSelectAudioDialog}
               onClose={() => setIsOpenSelectAudioDialog(false)}
            >
               <div className="p-3">
                  <source src={selectAudio} type="audio/mpeg" />
                  <div className="mt-2">
                     <label
                        className="text-tiny font-medium"
                        htmlFor="fileName"
                     >
                        File Name
                     </label>
                     <div className="flex items-center border px-2 rounded-md">
                        <input
                           className="w-full outline-none rounded-md focus:outline-none py-2"
                           onChange={(e) => {
                              setSelectAudio(e.target.value);
                              setError("");
                           }}
                           value={selectAudio}
                           type="text"
                           placeholder="Image Name"
                        />
                        {audioName !== selectAudio.name && (
                           <button
                              onClick={() => setAudioName(selectAudio.name)}
                              className="text-xs bg-gray-200 font-medium rounded-md px-2 py-1"
                           >
                              Reset
                           </button>
                        )}
                     </div>
                     {error && (
                        <div className="text-tiny text-red-600">{error}</div>
                     )}
                  </div>
                  <div className="flex justify-end space-x-3 mt-2">
                     <button
                        onClick={() => setIsOpenSelectAudioDialog(false)}
                        className="bg-gray-200 w-20 py-2 rounded-md font-medium"
                     >
                        Cancel
                     </button>
                     <button
                        onClick={handleSubmitUploadFile}
                        className="bg-blue-600 text-white w-20 py-2 rounded-md font-medium"
                     >
                        Uplaod
                     </button>
                  </div>
               </div>
            </Dialog>
         )}
      </div>
   );
};

export default AudioPage;
