import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Form, Formik } from "formik";

import { AuthCard } from "./auth.style";

import { FullScreenCenteredContainer } from "../Common/styles/common";
import PasswordInput from "../Common/UI/PasswordInput";
import { NavLink } from "react-router";

const Signup = () => {
  return (
    <Box sx={FullScreenCenteredContainer}>
      <Box sx={AuthCard}>
        <Typography variant="h3" sx={{ mb: 2 }}>
          SIGNUP
        </Typography>
        <Formik
          initialValues={{
            username: "",
            password: "",
            confirmPassword: "",
          }}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          {({ handleChange, values, getFieldProps }) => (
            <Form>
              <Stack gap={2}>
                <FormControl>
                  <FormLabel htmlFor="username">Username</FormLabel>
                  <TextField
                    id="username"
                    placeholder="Username"
                    {...getFieldProps("username")}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <PasswordInput
                    value={values.password}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="confirmPassword">
                    Confirm Password
                  </FormLabel>
                  <PasswordInput
                    id="confirmPassword"
                    placeholder="Confirm Password"
                    value={values.confirmPassword}
                    onChange={handleChange}
                  />
                </FormControl>
                <Box sx={{ my: 2 }}>
                  <Button fullWidth type="submit" variant="contained">
                    Signup
                  </Button>
                </Box>
                <NavLink to="/auth/login">Login</NavLink>
              </Stack>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default Signup;
