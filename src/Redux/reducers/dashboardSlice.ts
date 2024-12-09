import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Document } from "../../Components/Dashboard/Documents/documents.type";

export interface DashboardState {
  loading: boolean;

  documents: Document[];
}

const initialState: DashboardState = {
  loading: true,

  documents: [],
};

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setDocuments: (state, action: PayloadAction<Document[]>) => {
      state.documents = action.payload;
    },
    reset: () => initialState,
  },
});

export const { setLoading, reset, setDocuments } = dashboardSlice.actions;

export default dashboardSlice.reducer;
