import "./Navbar.css";

import Logout from "@mui/icons-material/Logout";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import Axios from "axios";
import * as React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { BsFillArrowDownCircleFill } from "react-icons/bs";
import OpenLMSLogo from "../../assets/351264.svg";

function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const loginstate = JSON.parse(sessionStorage.getItem("login") || "false");

  const [showButtons, setShowButtons] = useState(false);

  const toggleButtons = () => {
    setShowButtons(!showButtons);
  };

  useEffect(() => {
    const profile = document.getElementById("profile");

    if (!loginstate) {
      profile.style.display = "none";
    } else {
      profile.style.display = "block";
    }
  }, [loginstate]);

  const handle = async () => {
    const response = await Axios.get(
      "http://localhost:5000/api/auth/user/logout"
    );
    sessionStorage.setItem("login", JSON.stringify(false));

    window.location.reload();
  };
  return (
    <nav className="colr min-h-[110px] -z-50">
      <div className="flex justify-between item">
        <div>
          <img
            src={OpenLMSLogo}
            alt="Open LMS Logo"
            className="w-auto h-20 text-white"
          />
        </div>
        <div>
          <div className="flex justify-between text-white items-center mr-7 mt-2">
            <Link to="/" className="des mx-6">
              Home
            </Link>
            <Link to="/About" className="des mx-6">
              About
            </Link>
            <Link to="/Courses" className="des mx-6">
              Courses
            </Link>
            <Link to="/Contact" className="des mx-6">
              Contact
            </Link>

            <div id="profile">
              <React.Fragment>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <Tooltip title="Account settings">
                    <IconButton
                      onClick={handleClick}
                      size="small"
                      sx={{ ml: 2 }}
                      aria-controls={open ? "account-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                    >
                      <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
                    </IconButton>
                  </Tooltip>
                </Box>
                <Menu
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={open}
                  onClose={handleClose}
                  onClick={handleClose}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: "visible",
                      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                      mt: 1.5,
                      "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      "&::before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: "background.paper",
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                  <MenuItem onClick={handleClose}>
                    <Avatar /> Profile
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <Avatar /> My account
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                      <PersonAdd fontSize="small" />
                    </ListItemIcon>
                    Add another account
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                      <Settings fontSize="small" />
                    </ListItemIcon>
                    Settings
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleClose();
                      handle();
                    }}
                  >
                    <ListItemIcon>
                      <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                  </MenuItem>
                </Menu>
              </React.Fragment>
            </div>
          </div>
          <div className="text-white text-center items-center flex justify-center mt-3 font-medium">
            {showButtons && (
              <>
                <div className="pl-7 pr-7 rounded-md bg-[#6419E6] hover:bg-[#6419e6d8] text-[18px] mr-3">
                  <Link to="/Signup">Sign up</Link>
                </div>
                <div className="pl-7 pr-7 rounded-md text-[18px]  hover:bg-[#d926a9d8] bg-[#D926A9]">
                  <Link to="/Signin">Sign in</Link>
                </div>
              </>
            )}
          </div>
          <div className="flex justify-center item-center">
            <button onClick={toggleButtons}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
