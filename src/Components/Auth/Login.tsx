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
import { AxiosResponse } from "axios";
import { NavLink, useNavigate } from "react-router";

import { AuthCard } from "./auth.style";
import { FullScreenCenteredContainer } from "../Common/styles/common";
import PasswordInput from "../Common/UI/PasswordInput";
import { errorToastMessage, toastMessage } from "../../utils/toast";
import http from "../../utils/http";
import { useAppDispatch } from "../../Redux/hooks";
import { setUserAuth } from "../../Redux/reducers/userSlice";
import { jwtDecode } from "jwt-decode";

const schema = yup.object({
  username: yup.string().required("Username is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters long"),
});

type InitialValues = {
  username: string;
  password: string;
};

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [submitLoader, setSubmitLoader] = useState(false);

  const handleSubmit = async (values: InitialValues) => {
    try {
      setSubmitLoader(true);
      const res: AxiosResponse = await http.post("/auth/login", values);

      const data = res.data?.data;
      const accessToken = data?.accessToken;
      const refreshToken = data?.refreshToken;
      const decoded: any = jwtDecode(accessToken);

      localStorage.setItem("collabdocs-access-token", accessToken);
      localStorage.setItem("collabdocs-refresh-token", refreshToken);

      dispatch(
        setUserAuth({
          authenticated: true,
          userId: decoded?.sub,
          userName: decoded?.username,
        })
      );

      toastMessage("success", res.data?.message);
      setSubmitLoader(false);

      navigate("/");
    } catch (err) {
      errorToastMessage(err as Error);
      setSubmitLoader(false);
    }
  };

  return (
    <Box sx={FullScreenCenteredContainer}>
      <Box sx={AuthCard}>
        <Typography variant="h3" sx={{ mb: 2 }}>
          LOGIN
        </Typography>
        <Formik
          initialValues={
            {
              username: "",
              password: "",
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
                <Box sx={{ my: 2 }}>
                  <Button
                    fullWidth
                    type="submit"
                    variant="contained"
                    disabled={submitLoader}
                    endIcon={submitLoader && <CircularProgress size={20} />}
                  >
                    Login
                  </Button>
                </Box>
                <NavLink to="/auth/signup">Signup</NavLink>
              </Stack>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default Login;
