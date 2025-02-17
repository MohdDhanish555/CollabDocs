import React, { useEffect, useState } from "react";
import {
  Autocomplete,
  Box,
  Button,
  Chip,
  FormLabel,
  IconButton,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { ModalBaseStyle } from "../Common/styles/modal";
import { Cancel, ExpandMore, HighlightOff, Search } from "@mui/icons-material";
import { AxiosResponse } from "axios";

import {
  SearchWrapper,
  SearchIconWrapper,
  StyledInputBase,
  StyledSelectInputBase,
} from "./editor.style";

import { errorToastMessage, toastMessage } from "../../utils/toast";
import http from "../../utils/http";
import { useParams } from "react-router";
import { useAppSelector } from "../../Redux/hooks";

type Props = {
  showModal: boolean;
  closeModal: () => void;
};

type User = {
  id: string;
  name: string;
};

const AccessModal = ({ showModal, closeModal }: Props) => {
  const { id: documentId } = useParams();
  const userId = useAppSelector((state) => state.user.userId);

  const [accessLevel, setAccessLevel] = useState("read");
  const [searchLoader, setSearchLoader] = useState(true);
  const [buttonLoader, setButtonLoader] = useState(false);

  const [usersList, setUsersList] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState<any>([]);

  const handleLevelChange = (event: SelectChangeEvent<string>) => {
    setAccessLevel(event.target.value as string);
  };

  const addCollaborators = async () => {
    try {
      setButtonLoader(true);
      console.log(selectedUsers);
      const body = {
        collaborators: selectedUsers.map((user: User) => user.id),
        accessLevel,
      };
      const res: AxiosResponse = await http.post(
        `/documents/${documentId}/collaborators`,
        body
      );
      toastMessage("success", res.data?.message);
      setButtonLoader(false);
    } catch (error) {
      setButtonLoader(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setSearchLoader(true);
        const res: AxiosResponse = await http.get(`/users/list`);
        const data = res.data?.data;
        const formattedData = data
          .map((user: any) => ({
            id: user?.id,
            name: user?.username,
          }))
          .filter((user: any) => user.id !== userId);

        setUsersList(formattedData);
        setSearchLoader(false);
      } catch (err) {
        errorToastMessage(err as Error);
        setSearchLoader(false);
      }
    };
    fetchData();
  }, [setSearchLoader, userId]);

  const unselectUsers = (id: string) => {
    setSelectedUsers((prev: any) => prev.filter((u: User) => u.id !== id));
  };

  return (
    <Modal open={showModal} onClose={closeModal}>
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
        <Box sx={{ width: "100%" }}>
          <FormLabel htmlFor="email">Email address</FormLabel>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <SearchWrapper>
              <SearchIconWrapper>
                <Search htmlColor="#fff" />
              </SearchIconWrapper>
              <Autocomplete
                // id="email"
                multiple
                filterOptions={(x) => x}
                fullWidth
                loading={searchLoader}
                options={usersList}
                getOptionLabel={(option) => option.name}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                value={selectedUsers}
                onChange={(_, newValue) => {
                  setSelectedUsers(newValue);
                }}
                popupIcon={<ExpandMore htmlColor="#fff" />}
                renderInput={(params) => (
                  <StyledInputBase
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
                <MenuItem value={"read"}>can view</MenuItem>
                <MenuItem value={"write"}>can edit</MenuItem>
              </Select>
            </SearchWrapper>
            <Button
              variant="contained"
              disabled={buttonLoader}
              onClick={addCollaborators}
            >
              Invite
            </Button>
          </Box>
          {selectedUsers.length > 0 && (
            <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
              {selectedUsers.map((user: User) => (
                <Chip
                  variant="outlined"
                  key={user.id}
                  label={user.name}
                  onDelete={() => unselectUsers(user?.id)}
                  deleteIcon={<HighlightOff />}
                />
              ))}
            </Box>
          )}
        </Box>
      </Box>
    </Modal>
  );
};

export default AccessModal;
