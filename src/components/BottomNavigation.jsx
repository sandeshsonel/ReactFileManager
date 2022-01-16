import * as React from "react";
import { Link } from "react-router-dom";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";

const HomeBottomNavigation = () => {
   const [value, setValue] = React.useState(0);

   return (
      <BottomNavigation
         className="fixed bottom-0 right-0 left-0 border-t"
         showLabels
         value={value}
         onChange={(event, newValue) => {
            setValue(newValue);
         }}
      >
         <BottomNavigationAction
            LinkComponent={Link}
            to="/"
            label="Home"
            icon={<HomeRoundedIcon />}
         />
         <BottomNavigationAction
            LinkComponent={Link}
            to="/upload"
            label="Upload"
            icon={<AddCircleOutlineRoundedIcon />}
         />
         <BottomNavigationAction
            LinkComponent={Link}
            to="/profile"
            label="Profile"
            icon={<AccountCircleRoundedIcon />}
         />
      </BottomNavigation>
   );
};

export default HomeBottomNavigation;
