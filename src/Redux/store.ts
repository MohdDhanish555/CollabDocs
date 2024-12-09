import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import userSlice from "./reducers/userSlice";
import dashboardSlice from "./reducers/dashboardSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    dashboard: dashboardSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
