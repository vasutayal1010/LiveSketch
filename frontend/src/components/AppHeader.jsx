import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Avatar,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Person2Icon from "@mui/icons-material/Person2";
import LogoutIcon from "@mui/icons-material/Logout";
import ConfirmationModal from "./ConfirmModal";

const AppHeader = ({ isProfilePage }) => {
  const fullname = localStorage.getItem("fullname");
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const [isLogoutConfirm, setLogoutConfirm] = useState(false);

  const menuOptions = [
    {
      title: "Profile",
      icon: <Person2Icon fontSize="small" />,
      path: "/user-profile",
    },
    {
      title: "Logout",
      icon: <LogoutIcon fontSize="small" />,
      action: () => setLogoutConfirm(true),
    },
  ];

  return (
    <>
      <AppBar
        position="static"
        sx={{ backgroundColor: "#1976D2", padding: "8px 16px" }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" fontWeight="bold" component="div">
            Collaborative WhiteBoard
          </Typography>
          {!isProfilePage && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Typography variant="body1" sx={{ fontWeight: "500" }}>
                {fullname}
              </Typography>
              <IconButton
                onClick={(e) => setAnchorEl(e.currentTarget)}
                color="inherit"
              >
                <Avatar sx={{ bgcolor: "white", color: "#1976D2" }}>
                  <AccountCircleIcon />
                </Avatar>
              </IconButton>
            </Box>
          )}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
          >
            {menuOptions.map((option, index) => (
              <MenuItem
                key={index}
                sx={{
                  padding: "10px 20px",
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
                onClick={option.action || (() => setAnchorEl(null))}
              >
                {option.path ? (
                  <Link
                    to={option.path}
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    {option.icon} {option.title}
                  </Link>
                ) : (
                  <>
                    {option.icon} {option.title}
                  </>
                )}
              </MenuItem>
            ))}
          </Menu>
        </Toolbar>
      </AppBar>

      <ConfirmationModal
        open={isLogoutConfirm}
        title="Logout Confirmation"
        content="Are you sure you want to logout?"
        onConfirm={() => {
          localStorage.clear();
          navigate("/login");
        }}
        onClose={() => setLogoutConfirm(false)}
      />
    </>
  );
};

export default AppHeader;
