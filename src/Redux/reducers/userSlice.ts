import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

export interface UserState {
  isUserAuthenticated: boolean;

  userId: string;
  userName: string;
}

const initialState: UserState = {
  isUserAuthenticated: false,

  userId: "",
  userName: "",
};

const getIntialState = (): UserState => {
  let isUserAuthenticated = false;
  let userId = "";
  let userName = "";

  const token = localStorage.getItem("collabdocs-access-token") || "";
  if (token) {
    try {
      const decoded: any = jwtDecode(token);

      isUserAuthenticated = true;
      userId = decoded?.sub;
      userName = decoded?.username;
    } catch (error) {}
  }
  return {
    ...initialState,
    isUserAuthenticated,
    userId,
    userName,
  };
};

export const userSlice = createSlice({
  name: "user",
  initialState: getIntialState,
  reducers: {
    setUserAuth: (
      state,
      action: PayloadAction<{
        authenticated: boolean;
        userId: any;
        userName: any;
      }>
    ) => {
      state.isUserAuthenticated = action.payload.authenticated;
      state.userId = action.payload.userId;
      state.userName = action.payload.userName;
    },
    reset: () => initialState,
  },
});

export const { setUserAuth, reset } = userSlice.actions;

export default userSlice.reducer;
