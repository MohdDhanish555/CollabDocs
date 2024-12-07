import React, { useState } from "react";
import {
  IconButton,
  InputAdornment,
  SxProps,
  TextField,
  Theme,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

type Props = {
  placeholder?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  helperText?: string;
  id?: string;
  sx?: SxProps<Theme>;
};

const PasswordInput = ({
  placeholder = "Password",
  value,
  onChange,
  helperText,
  id = "password",
  sx,
}: Props) => {
  const [showPassword, setshowPassword] = useState<boolean>(false);

  const handleClickShowPassword = () => {
    setshowPassword((prev) => !prev);
  };

  return (
    <TextField
      id={id}
      value={value}
      onChange={onChange}
      type={showPassword ? "text" : "password"}
      helperText={helperText || ""}
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label={
                  showPassword ? "hide the password" : "display the password"
                }
                onClick={handleClickShowPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
      sx={sx ? sx : undefined}
      placeholder={placeholder}
    />
  );
};

export default PasswordInput;
