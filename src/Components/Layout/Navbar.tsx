import React from "react";
import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { deepPurple } from "@mui/material/colors";

import { useAppSelector } from "../../Redux/hooks";
import { StyledBadge } from "../Common/UI/Badge";

const settings = ["Profile", "Logout"];

const Navbar = () => {
  const userName = useAppSelector((state) => state.user.userName);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <AppBar
      sx={{
        position: "sticky",
        backgroundColor: "background.paper",
      }}
    >
      <Toolbar>
        <Typography
          variant="h4"
          noWrap
          sx={{
            mr: 2,
            display: { xs: "none", md: "flex" },
            fontWeight: 700,
            letterSpacing: ".3rem",
            textTransform: "uppercase",
          }}
        >
          CollabDocs
        </Typography>
        <Box sx={{ ml: "auto" }}>
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
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
              <MenuItem key={setting} onClick={handleCloseUserMenu}>
                <Typography sx={{ textAlign: "center" }}>{setting}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
