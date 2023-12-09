import React from "react";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ListItem from "@mui/material/ListItem";
import { Typography } from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useDispatch } from "react-redux";
import LogoutIcon from "@mui/icons-material/Logout";
import { setLogout } from "../state/authState";


import { Avatar } from "@mui/material";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import {Menu} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MenuItem from "@mui/material/MenuItem";

import { useNavigate } from "react-router-dom";

const drawerWidth = 210;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  background: "#131E26",
  color: "white",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
  background: "#131E26",
  color: "white",
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

function Sidebar() {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleToggleSidebar = () => {
    setOpen((prevState) => !prevState);
  };

  const isMenuOpen = Boolean(anchorEl);
  const userDetails = { name: 'John Doe' }; // Replace this with your user details

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Function to log out the user
  const logout = () => {
    navigate("/login");
    window.localStorage.clear();
    dispatch(setLogout());
  };

  const renderMenu = (
    <Menu
      sx={{ mt: isMenuOpen ? "49px" : "0px" }}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem sx={{ display: "flex", gap: "5%" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <div>
            
              <Avatar>
                <AccountCircleIcon
                  sx={{
                    width: "100%",
                    height: "100%",
                    aspectRatio: 1,
                    textAlign: "center",
                    padding: "0px",
                  }}
                />
              </Avatar>
          
          </div>
        </Box>
        <Box>
    
          <Typography sx={{ fontSize: "14px" , }}>
            {userDetails?.name}
          </Typography>
        </Box>
        
      </MenuItem>
      
      <MenuItem onClick={logout} sx={{ gap: "5%", my: 1 }}>
        <LogoutIcon /> Logout
      </MenuItem>
    </Menu>
  );

  return (
    <>
      <Box
        className="sidebar-div"
        sx={{
          display: "grid",
          height: "100vh",
          gridTemplateRows: "64px 1fr",
          width: "100%",
          backgroundColor: "white",
        }}
      >
        <CssBaseline />
        <div style={{ width: "100%" }}>
          <AppBar
            position="fixed"
            sx={{
              backgroundColor: "white",
              boxShadow: "0px 0px 0px 0px",
              zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
          >
            <Toolbar
              sx={{
                display: "flex",
                justifyContent: "Between",
                border: "1px solid #EAEFFF",
                height: "66px",
              }}
            >
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleToggleSidebar}
                edge="start"
                sx={{
                  marginRight: 1,
                  color: "#e4e8ed",
                  display: { sx: "block", sm: "block", md: "none" },
                }}
              >
                <MenuIcon sx={{ color: "#888888" }} />
              </IconButton>
              <Box>
                <Typography sx={{ color: 'black' }}>Bugs Slayers</Typography>
              </Box>
              {/* ... */}
            </Toolbar>
          </AppBar>
        </div>
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "100%",
            overflowY: "auto",
          }}
        >
          <div>
            <Drawer
              variant="permanent"
              open={open}
              onMouseEnter={handleToggleSidebar}
              onMouseLeave={handleDrawerClose}
            >
              <DrawerHeader>
                <IconButton onClick={handleDrawerClose}>
                  <ChevronLeftIcon size="large" color="primary" />
                </IconButton>
              </DrawerHeader>
              <Divider />
              <List>
                <ListItem
                  disablePadding
                  onClick={() => {
                    navigate("/Lms");
                  }}
                >
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon>
                      <PeopleAltIcon sx={{ color: "white" }} />
                    </ListItemIcon>
                    <ListItemText
                      primaryTypographyProps={{
                        fontSize: "14px",
                        fontWeight: "600",
                        color: "white",
                      }}
                    >
                      Leads
                    </ListItemText>
                  </ListItemButton>
                </ListItem>


               <List   sx={{ marginTop: 'auto' }}></List>
                <ListItem
              disablePadding
              onClick={logout} // If you want the whole item to act as a logout button
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                {/* Display user name */}
                <ListItemIcon>
                  <AccountCircleIcon sx={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText
                  primaryTypographyProps={{
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "white",
                  }}
                >
                  {userDetails?.name}
                </ListItemText>
              </ListItemButton>
              {/* Or, if you want a separate logout button */}
              <IconButton onClick={logout}>
                <LogoutIcon sx={{ color: "white" }} />
              </IconButton>
            </ListItem>
      
              </List>
              <Divider />
              <List></List>
            </Drawer>
          </div>
          {/* ... */}
        </div>
      </Box>
    </>
  );
}

export default Sidebar;
