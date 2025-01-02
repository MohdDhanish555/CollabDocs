import {
  alpha,
  Autocomplete,
  Box,
  Button,
  FormControl,
  FormLabel,
  IconButton,
  InputBase,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
  styled,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { ModalBaseStyle } from "../Common/styles/modal";
import { Cancel, ExpandMore, Search } from "@mui/icons-material";

type Props = {
  showModal: boolean;
  closeModal: () => void;
};

const SearchWrapper = styled("div")(({ theme }) => ({
  position: "relative",
  flex: 1,
  borderRadius: "8px",
  backgroundColor: alpha("#27344D", 0.55),
  "&:hover": {
    backgroundColor: alpha("#27344D", 0.65),
  },
  width: "100%",
  height: "50px",
  [theme.breakpoints.up("sm")]: {
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  height: "50px",
  borderRadius: "8px",

  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    paddingRight: "120px",
  },
}));

const StyledSelectInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  position: "absolute",
  backgroundColor: theme.palette.background.paper,
  top: 5,
  right: 5,
  height: "40px",
  borderRadius: "8px",

  "& .MuiInputBase-input": {
    padding: theme.spacing(0, 0, 0, 1.5),
    width: "65px",
    // vertical padding + font size from searchIcon
    // paddingLeft: `calc(1em + ${theme.spacing(4)})`,
  },
}));

const AccessModal = ({ showModal, closeModal }: Props) => {
  const [accessLevel, setAccessLevel] = useState("view");

  const handleLevelChange = (event: SelectChangeEvent<string>) => {
    setAccessLevel(event.target.value as string);
  };

  return (
    <Modal open={true} onClose={closeModal}>
      <Box sx={ModalBaseStyle}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="subtitle2" fontWeight="medium">
            Manage who can view this project
          </Typography>
          <IconButton sx={{ p: 0.5 }} onClick={closeModal}>
            <Cancel htmlColor="#fff" />
          </IconButton>
        </Box>
        <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
          Select which users can access and view this project.
        </Typography>
        <FormControl sx={{ width: "100%" }}>
          <FormLabel htmlFor="email">Email address</FormLabel>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <SearchWrapper>
              <SearchIconWrapper>
                <Search htmlColor="#fff" />
              </SearchIconWrapper>
              <Autocomplete
                id="email"
                disablePortal
                options={[]}
                sx={{ width: "100%" }}
                popupIcon={<ExpandMore htmlColor="#fff" />}
                renderInput={(params) => (
                  <StyledInputBase
                    fullWidth
                    ref={params.InputProps.ref}
                    inputProps={params.inputProps}
                    placeholder="Search for users…"
                  />
                )}
              />
              <Select
                labelId="demo-customized-select-label"
                id="demo-customized-select"
                value={accessLevel}
                onChange={handleLevelChange}
                input={<StyledSelectInputBase />}
                IconComponent={ExpandMore}
                sx={{
                  ".MuiSelect-icon": {
                    color: "#fff",
                    fontSize: "18px",
                  },
                }}
              >
                <MenuItem value={"view"}>can view</MenuItem>
                <MenuItem value={"edit"}>can edit</MenuItem>
              </Select>
            </SearchWrapper>
            <Button variant="contained">Invite</Button>
          </Box>
        </FormControl>
      </Box>
    </Modal>
  );
};

export default AccessModal;
