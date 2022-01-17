import React, { useState } from "react";
import { persistor } from "store";

import ForwardIcon from "assets/icons/chevron-forward-outline.svg";
import Logout from "assets/icons/log-out-outline.svg";
import SettingIcon from "assets/icons/settings-outline.svg";

import { CardActionArea, Dialog } from "@mui/material";

const Profile = () => {
   const [isOpenLogoutDialog, setIsOpenLogoutDialog] = useState(false);
   const handleLogout = () => {
      persistor.purge();
      localStorage.clear();
      setIsOpenLogoutDialog(false);
   };
   return (
      <div className="h-screen flex-col justify-between bg-gray-50">
         <CardActionArea>
            <div className="flex items-center justify-between py-3 px-3">
               <div>
                  <div>
                     <div className="font-medium">Sandesh Sonel</div>
                     <div className="text-tiny text-gray-500">
                        sonelsandesh@gmail.com
                     </div>
                  </div>
               </div>
               <div>
                  <img className="w-5" src={ForwardIcon} alt="" />
               </div>
            </div>
         </CardActionArea>
         <CardActionArea>
            <div className="flex items-center justify-between bg-white py-3 px-3 border-b">
               <div className="flex items-center space-x-2">
                  <img className="w-6 h-6" src={SettingIcon} alt="" />

                  <div className="font-medium text-tiny xl:text-base">
                     Settings
                  </div>
               </div>
               <div>
                  <img className="w-5" src={ForwardIcon} alt="" />
               </div>
            </div>
         </CardActionArea>
         <CardActionArea onClick={() => setIsOpenLogoutDialog(true)}>
            <div className="flex items-center justify-between bg-white py-3 px-3 border-b">
               <div className="flex items-center space-x-2">
                  <img className="w-6 h-6" src={Logout} alt="" />

                  <div className="font-medium text-tiny xl:text-base">
                     Logout
                  </div>
               </div>
               <div>
                  <img className="w-5" src={ForwardIcon} alt="" />
               </div>
            </div>
         </CardActionArea>
         {isOpenLogoutDialog && (
            <Dialog
               fullWidth
               maxWidth="xs"
               open={isOpenLogoutDialog}
               onClose={() => setIsOpenLogoutDialog(false)}
            >
               <div className="p-3">
                  <div className="text-tiny xl:text-lg font-medium">Logout</div>
                  <div className="flex items-center space-x-3 justify-end mt-3">
                     <button
                        onClick={() => setIsOpenLogoutDialog(false)}
                        className="bg-gray-200 py-1 w-16 text-tiny rounded-md font-medium"
                     >
                        Cancel
                     </button>
                     <button
                        onClick={handleLogout}
                        className="bg-red-600 text-white py-1 w-16 text-tiny rounded-md font-medium"
                     >
                        Logout
                     </button>
                  </div>
               </div>
            </Dialog>
         )}
      </div>
   );
};

export default Profile;
