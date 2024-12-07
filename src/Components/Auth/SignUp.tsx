import { useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormLabel,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Form, Formik } from "formik";
import * as yup from "yup";
import { errorToastMessage, toastMessage } from "../../utils/toast";
import { AxiosResponse } from "axios";

import { AuthCard } from "./auth.style";
import { FullScreenCenteredContainer } from "../Common/styles/common";

import PasswordInput from "../Common/UI/PasswordInput";
import { NavLink, useNavigate } from "react-router";
import { http } from "../../utils/http";

const schema = yup.object({
  username: yup.string().required("Username is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters long")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[@$!%*?&#]/,
      "Password must contain at least one special character"
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), undefined], "Passwords must match")
    .required("Confirm Password is required"),
});

type InitialValues = {
  username: string;
  password: string;
  confirmPassword: string;
};

const Signup = () => {
  const navigate = useNavigate();
  const [submitLoader, setSubmitLoader] = useState(false);

  const handleSubmit = async (values: InitialValues) => {
    try {
      setSubmitLoader(true);
      const body = {
        username: values.username,
        password: values.password,
      };
      const res: AxiosResponse = await http.post("/users/create", body);
      toastMessage("success", res.data?.message);
      setSubmitLoader(false);

      navigate("/auth/login");
    } catch (err) {
      errorToastMessage(err as Error);
      setSubmitLoader(false);
    }
  };

  return (
    <Box sx={FullScreenCenteredContainer}>
      <Box sx={AuthCard}>
        <Typography variant="h3" sx={{ mb: 2 }}>
          SIGNUP
        </Typography>
        <Formik
          initialValues={
            {
              username: "",
              password: "",
              confirmPassword: "",
            } as InitialValues
          }
          validationSchema={schema}
          onSubmit={(values) => {
            handleSubmit(values);
          }}
        >
          {({ handleChange, values, getFieldProps, errors, touched }) => (
            <Form>
              <Stack>
                <FormControl>
                  <FormLabel htmlFor="username">Username</FormLabel>
                  <TextField
                    id="username"
                    placeholder="Username"
                    {...getFieldProps("username")}
                    helperText={
                      errors.username && touched.username
                        ? errors.username
                        : " "
                    }
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <PasswordInput
                    value={values.password}
                    onChange={handleChange}
                    helperText={
                      errors.password && touched.password
                        ? errors.password
                        : " "
                    }
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
                    helperText={
                      errors.confirmPassword && touched.confirmPassword
                        ? errors.confirmPassword
                        : " "
                    }
                  />
                </FormControl>
                <Box sx={{ my: 2 }}>
                  <Button
                    fullWidth
                    type="submit"
                    variant="contained"
                    disabled={submitLoader}
                    endIcon={submitLoader && <CircularProgress size={20} />}
                  >
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
