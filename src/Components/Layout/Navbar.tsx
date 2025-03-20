import React, { useState } from "react";
import {
  AppBar,
  Avatar,
  Box,
  CircularProgress,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { deepPurple } from "@mui/material/colors";

import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { StyledBadge } from "../Common/UI/Badge";
import DocumentTitle from "./DocumentTitle";
import { useLocation, useNavigate } from "react-router";
import { errorToastMessage, toastMessage } from "../../utils/toast";
import { AxiosResponse } from "axios";
import http from "../../utils/http";
import { resetState } from "../../Redux/actions/resetAction";

const settings = ["Profile", "Logout"];

const Navbar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [menuLoader, setMenuLoader] = useState<string>("");

  const userName = useAppSelector((state) => state.user.userName);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const location = useLocation();
  const isDocumentPath = location.pathname.includes("document");

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logoutUser = async () => {
    try {
      setMenuLoader("Logout");
      const res: AxiosResponse = await http.post("/auth/logout");

      dispatch(resetState());

      localStorage.clear();
      toastMessage("success", res.data.message);
      navigate("/");
      setMenuLoader("");
    } catch (err) {
      setMenuLoader("");
      errorToastMessage(err as Error);
    }
  };

  const handleMenuAction = (type: string) => {
    if (type === "Logout") {
      logoutUser();
    }
  };

  return (
    <AppBar
      sx={{
        position: "sticky",
        backgroundColor: "background.paper",
        height: "70px",
      }}
    >
      <Toolbar
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          alignItems: "center",
          height: "100%",
        }}
      >
        <Typography
          variant="h4"
          noWrap
          sx={{
            display: { xs: "none", md: "flex" },
            fontWeight: 700,
            letterSpacing: ".3rem",
            textTransform: "uppercase",
            justifySelf: "start",
          }}
        >
          CollabDocs
        </Typography>
        {isDocumentPath ? <DocumentTitle /> : <Box />}
        <IconButton
          onClick={handleOpenUserMenu}
          sx={{ p: 0, justifySelf: "end" }}
        >
          <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            variant="dot"
          >
            <Avatar
              sx={{ textTransform: "uppercase", bgcolor: deepPurple[500] }}
            >
              {userName?.charAt(0)}
            </Avatar>
          </StyledBadge>
        </IconButton>
        <Menu
          sx={{ mt: "45px" }}
          id="navbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          {settings.map((setting) => (
            <MenuItem
              disabled={!!menuLoader}
              key={setting}
              onClick={() => handleMenuAction(setting)}
            >
              <Typography sx={{ textAlign: "center" }}>{setting}</Typography>
              <ListItemIcon>
                {menuLoader === setting && (
                  <CircularProgress size={18} sx={{ ml: 1 }} />
                )}
              </ListItemIcon>
            </MenuItem>
          ))}
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
