import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import imageIcon from "assets/icons/image.svg";
import videoIcon from "assets/icons/videocam.svg";
import documentIcon from "assets/icons/document-text.svg";
import audioIcon from "assets/icons/musical-notes.svg";
import CloseIcon from "@mui/icons-material/Close";
// import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";

import {
   Dialog,
   DialogContent,
   DialogActions,
   IconButton,
} from "@mui/material";
import { CardActionArea } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import SearchFile from "components/SearchFile";

import { setIsOpenUploadFileDialog } from "store/actions/fileManager";

const tabOptions = {
   recent: "Recents",
   favorites: "Favorites",
};

class Home extends Component {
   constructor(props) {
      super(props);

      this.state = {
         activeTab: tabOptions.recent,
         searchValue: "",
      };
   }

   render() {
      return (
         <div className="px-3 xl:px-0">
            <div className="static">
               <div className="mt-3">
                  <SearchFile
                     name="searchImage"
                     value={this.state.searchValue}
                     handleChange={(e) =>
                        this.setState({ searchValue: e.target.value })
                     }
                     handleClear={() => this.setState({ searchValue: "" })}
                  />
               </div>

               <div className="mt-4">
                  <div className="font-medium text-tiny xl:text-base pb-2">
                     Categories
                  </div>
                  <div className="grid grid-cols-4 gap-2 xl:gap-3 xl:border xl:p-3 rounded-md">
                     <Link to="/image">
                        <CardActionArea>
                           <button className="flex flex-col items-center w-full bg-gray-100 rounded-md py-2">
                              <img
                                 className="w-6 xl:w-8"
                                 src={imageIcon}
                                 alt=""
                              />
                              <span className="text-xs xl:text-tiny mt-2">
                                 Image
                              </span>
                           </button>
                        </CardActionArea>
                     </Link>
                     <Link to="/video">
                        <CardActionArea>
                           <button className="flex flex-col border border-red-600 items-center w-full bg-gray-100 rounded-md py-2">
                              <img
                                 className="w-6 xl:w-8"
                                 src={videoIcon}
                                 alt=""
                              />
                              <span className="text-xs xl:text-tiny mt-2">
                                 Video
                              </span>
                           </button>
                        </CardActionArea>
                     </Link>
                     <Link to="/document">
                        <CardActionArea>
                           <button className="flex flex-col items-center w-full bg-gray-100 rounded-md py-2">
                              <img
                                 className="w-6 xl:w-8"
                                 src={documentIcon}
                                 alt=""
                              />
                              <span className="text-xs xl:text-tiny mt-2">
                                 Document
                              </span>
                           </button>
                        </CardActionArea>
                     </Link>
                     <Link to="/audio">
                        <CardActionArea>
                           <button className="flex flex-col items-center w-full bg-gray-100 rounded-md py-2">
                              <img
                                 className="w-6 xl:w-8"
                                 src={audioIcon}
                                 alt=""
                              />
                              <span className="text-xs xl:text-tiny mt-2">
                                 Audio
                              </span>
                           </button>
                        </CardActionArea>
                     </Link>
                  </div>
               </div>

               <div className="mt-3">
                  <div className="flex items-center justify-between">
                     <div className="font-medium text-tiny xl:text-base pb-2">
                        My Storage
                     </div>
                     <div className="text-sm font-medium">34% free</div>
                  </div>
                  <LinearProgress variant="determinate" value={34} />
                  <div className="grid grid-cols-3 gap-3 text-center mt-4">
                     <div className="border p-3 rounded-md shadow">
                        <div className="font-medium">66 GB</div>
                        <div className="text-xs font-medium text-gray-500">
                           Used Space
                        </div>
                     </div>
                     <div className="border p-3 rounded-md shadow">
                        <div className="font-medium">34 GB</div>
                        <div className="text-xs font-medium text-gray-500">
                           Free Space
                        </div>
                     </div>
                     <div className="border p-3 rounded-md shadow">
                        <div className="font-medium">5 GB</div>
                        <div className="text-xs font-medium text-gray-500">
                           Total Space
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            {/* <div>
          <div className="font-medium text-tiny xl:text-base pb-2">
            My Files
          </div>
          <div className="space-y-2">
            <Link to="/image">
              <div className="flex items-center space-x-3 border p-3 rounded-md cursor-pointer hover:bg-gray-100">
                <div>
                  <div className="flex flex-col justify-center items-center h-14 w-14 rounded-md bg-gray-200">
                    <img className="w-6 xl:w-6" src={imageIcon} alt="" />
                  </div>
                </div>
                <div className="flex items-center space-x-2 w-full">
                  <div className="w-full space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="text-tiny font-medium">Images</div>
                      <div className="text-sm font-medium text-gray-500">
                        4.5 GB
                      </div>
                    </div>
                    <div>
                      <LinearProgress variant="determinate" value={34} />
                    </div>
                  </div>
                  <div>
                    <ArrowForwardIosRoundedIcon
                      className="text-blue-500"
                      fontSize="small"
                    />
                  </div>
                </div>
              </div>
            </Link>
            <Link to="/video">
              <div className="flex items-center space-x-3 border p-3 rounded-md cursor-pointer hover:bg-gray-100">
                <div>
                  <div className="flex flex-col justify-center items-center h-14 w-14 rounded-md bg-gray-200">
                    <img className="w-6 xl:w-6" src={videoIcon} alt="" />
                  </div>
                </div>
                <div className="flex items-center space-x-2 w-full">
                  <div className="w-full space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="text-tiny font-medium">Video</div>
                      <div className="text-sm font-medium text-gray-500">
                        4.5 GB
                      </div>
                    </div>
                    <div>
                      <LinearProgress variant="determinate" value={34} />
                    </div>
                  </div>
                  <div>
                    <ArrowForwardIosRoundedIcon
                      className="text-blue-500"
                      fontSize="small"
                    />
                  </div>
                </div>
              </div>
            </Link>
            <Link to="/video">
              <div className="flex items-center space-x-3 border p-3 rounded-md cursor-pointer hover:bg-gray-100">
                <div>
                  <div className="flex flex-col justify-center items-center h-14 w-14 rounded-md bg-gray-200">
                    <img className="w-6 xl:w-6" src={documentIcon} alt="" />
                  </div>
                </div>
                <div className="flex items-center space-x-2 w-full">
                  <div className="w-full space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="text-tiny font-medium">Documents</div>
                      <div className="text-sm font-medium text-gray-500">
                        4.5 GB
                      </div>
                    </div>
                    <div>
                      <LinearProgress variant="determinate" value={34} />
                    </div>
                  </div>
                  <div>
                    <ArrowForwardIosRoundedIcon
                      className="text-blue-500"
                      fontSize="small"
                    />
                  </div>
                </div>
              </div>
            </Link>
            <Link to="/video">
              <div className="flex items-center space-x-3 border p-3 rounded-md cursor-pointer hover:bg-gray-100">
                <div>
                  <div className="flex flex-col justify-center items-center h-14 w-14 rounded-md bg-gray-200">
                    <img className="w-6 xl:w-6" src={audioIcon} alt="" />
                  </div>
                </div>
                <div className="flex items-center space-x-2 w-full">
                  <div className="w-full space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="text-tiny font-medium">Audio</div>
                      <div className="text-sm font-medium text-gray-500">
                        4.5 GB
                      </div>
                    </div>
                    <div>
                      <LinearProgress variant="determinate" value={34} />
                    </div>
                  </div>
                  <div>
                    <ArrowForwardIosRoundedIcon
                      className="text-blue-500"
                      fontSize="small"
                    />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div> */}
            <div className="sticky h-full">
               <div className="flex items-center justify-between border-b pb-3 mt-4">
                  <div className="flex items-center space-x-1">
                     <button
                        onClick={() =>
                           this.setState({ activeTab: tabOptions.recent })
                        }
                        className={`px-2 py-1 text-tiny font-semiBold ${
                           this.state.activeTab === tabOptions.recent
                              ? "text-blue-600 bg-gray-100 rounded-md"
                              : "text-gray-500"
                        }`}
                     >
                        Recents
                     </button>
                     <button
                        onClick={() =>
                           this.setState({ activeTab: tabOptions.favorites })
                        }
                        className={`px-2 py-1 text-tiny font-semiBold ${
                           this.state.activeTab === tabOptions.favorites
                              ? "text-blue-600 bg-gray-100 rounded-md"
                              : "text-gray-500"
                        }`}
                     >
                        Favorites
                        {/* <hr className="mb-4" /> */}
                     </button>
                  </div>
               </div>
            </div>
            <Dialog
               fullWidth
               maxWidth="xs"
               open={this.props.isOpenUploadFileDialog}
            >
               <div className="p-3">
                  <div className="">
                     <div className="flex justify-end">
                        <IconButton>
                           <CloseIcon fontSize="small" />
                        </IconButton>
                     </div>
                     <div className="flex items-center justify-between mt-2">
                        <div className="font-medium">Files</div>
                        <button className="bg-gray-300 py-1 px-2 text-tiny font-medium rounded-md">
                           Select File
                        </button>
                     </div>
                  </div>
                  <DialogContent
                     className="flex flex-col justify-between"
                     style={{ height: "500px" }}
                  ></DialogContent>
                  <DialogActions>
                     <button className="bg-blue-600 py-2 text-white font-medium rounded-md w-full">
                        Upload
                     </button>
                  </DialogActions>
               </div>
            </Dialog>
         </div>
      );
   }
}

Home.propTypes = {
   isOpenUploadFileDialog: PropTypes.bool,
   setIsOpenUploadFileDialog: PropTypes.func,
};

const mapStateToProps = (state) => ({
   isOpenUploadFileDialog: state.fileManager.isOpenUploadFileDialog,
});

const mapDispatchToProps = {
   setIsOpenUploadFileDialog,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
