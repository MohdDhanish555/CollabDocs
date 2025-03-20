import { AppThunk } from "../store";
import { reset as userReset } from "../reducers/userSlice";
import { reset as dashboardReset } from "../reducers/dashboardSlice";
import { reset as documentReset } from "../reducers/documentSlice";

export const resetState = (): AppThunk => (dispatch) => {
  dispatch(userReset());
  dispatch(dashboardReset());
  dispatch(documentReset());
};
