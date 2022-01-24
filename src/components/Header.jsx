import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";

import { IconButton, LinearProgress } from "@mui/material";

const Header = (props) => {
   return (
      <div className=" sticky top-0 z-50">
         <div className="flex items-center justify-between bg-gray-200 px-4 py-2">
            <Link to="/">
               <div className="text-lg xl:text-xl font-medium">My Files</div>
            </Link>
            <div>
               <IconButton>
                  <NotificationsRoundedIcon />
               </IconButton>
            </div>
         </div>
         {props.isLoading && (
            <>
               <LinearProgress />
               <div className="absolute right-0 left-0 max-w-lg m-auto z-50 bg-gray-200 opacity-50 h-screen"></div>
            </>
         )}
      </div>
   );
};

Header.propTypes = {
   isLoading: PropTypes.bool,
};

const mapStateToProps = (state) => ({
   isLoading: state.fileManager.isLoading,
});

export default connect(mapStateToProps)(Header);
