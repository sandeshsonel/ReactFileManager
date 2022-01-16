import React, { useState } from "react";

import videoIcon from "assets/icons/videocam.svg";
import ellipsisIcon from "assets/icons/ellipsis-horizontal-outline.svg";

import SearchFile from "components/SearchFile";

const VideoPage = () => {
   const [searchVideo, setSearchVideo] = useState("");
   return (
      <div className="mt-3 px-3 xl:px-0">
         <div className="flex items-center justify-between">
            <div className="text-lg xl:text-xl font-medium">Videos</div>
            <button className="w-16 text-tiny rounded-md font-medium bg-gray-200 py-1">
               Add
            </button>
         </div>
         <div className="mt-3">
            <SearchFile
               name="searchVideo"
               value={searchVideo}
               handleChange={(e) => setSearchVideo(e.target.value)}
               handleClear={() => setSearchVideo("")}
            />
         </div>
         <div className="mt-3">
            <div>
               <div className="flex items-center justify-between py-3 border-b">
                  <div className="flex items-center space-x-2">
                     <div>
                        <img className="w-7 xl:w-10" src={videoIcon} alt="" />
                     </div>
                     <div>
                        <div className="text-tiny xl:text-base font-medium">
                           Invoice
                        </div>
                        <div className="text-sm text-gray-400">Today, 10Mb</div>
                     </div>
                  </div>
                  <div>
                     <img className="w-5" src={ellipsisIcon} alt="" />
                  </div>
               </div>
               <div className="flex items-center justify-between py-3 border-b">
                  <div className="flex items-center space-x-2">
                     <div>
                        <img className="w-7 xl:w-10" src={videoIcon} alt="" />
                     </div>
                     <div>
                        <div className="text-tiny xl:text-base font-medium">
                           Invoice
                        </div>
                        <div className="text-sm text-gray-400">Today, 10Mb</div>
                     </div>
                  </div>
                  <div className="cursor-pointer">
                     <img className="w-5" src={ellipsisIcon} alt="" />
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default VideoPage;
