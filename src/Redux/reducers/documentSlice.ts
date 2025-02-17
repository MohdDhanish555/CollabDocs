import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  title: string;
  content: string;
  authorId: string;
  hasAccess: boolean;

  loading: boolean;
}

const initialState: UserState = {
  title: "",
  content: "",
  authorId: "",
  hasAccess: false,

  loading: true,
};

export const documentSlice = createSlice({
  name: "document",
  initialState,
  reducers: {
    setDocumentLoader: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setDocumentDetails: (
      state,
      action: PayloadAction<{
        title: string;
        content: string;
        authorId: string;
      }>
    ) => {
      state.title = action.payload.title;
      state.content = action.payload.content;
      state.authorId = action.payload.authorId;
    },
    setDocumentTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    setDocumentAccess: (state, action: PayloadAction<boolean>) => {
      state.hasAccess = action.payload;
    },
    reset: () => initialState,
  },
});

export const {
  setDocumentDetails,
  setDocumentTitle,
  setDocumentLoader,
  setDocumentAccess,
  reset,
} = documentSlice.actions;

export default documentSlice.reducer;
