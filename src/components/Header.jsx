import React from "react";
import { Link } from "react-router-dom";

import { IconButton } from "@mui/material";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";

const Header = () => {
  return (
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
  );
};

export default Header;
