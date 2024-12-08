import { AppThunk } from "../store";
import { reset as userReset } from "../reducers/userSlice";

export const resetState = (): AppThunk => (dispatch) => {
  dispatch(userReset());
};
