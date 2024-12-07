import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  isUserAuthenticated: boolean;
}

const initialState: UserState = {
  isUserAuthenticated: false,
};

const getIntialState = (): UserState => {
  let isUserAuthenticated = false;

  const token = localStorage.getItem("collabdocs-access-token") || "";
  if (token) {
    isUserAuthenticated = true;
  }
  return {
    ...initialState,
    isUserAuthenticated,
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
      }>
    ) => {
      state.isUserAuthenticated = action.payload.authenticated;
    },
    reset: () => initialState,
  },
});

export const { setUserAuth, reset } = userSlice.actions;

export default userSlice.reducer;
