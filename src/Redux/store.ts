import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import userSlice from "./reducers/userSlice";
import dashboardSlice from "./reducers/dashboardSlice";
import documentSlice from "./reducers/documentSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    dashboard: dashboardSlice,
    document: documentSlice,
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
