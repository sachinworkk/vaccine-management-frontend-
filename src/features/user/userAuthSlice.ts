import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { loginUserThunk, signUpUserThunk, signOutUserThunk } from "./userThunk";

const initialState = {
  user: {
    id: 0,
    email: "",
    password: "",
  },
  isLoading: false,
  error: "",
};

export const loginUser = createAsyncThunk("userAuth/loginUser", loginUserThunk);
export const signOutUser = createAsyncThunk(
  "userAuth/signOutUser",
  signOutUserThunk
);
export const signUpUser = createAsyncThunk(
  "signUpUserAuth/signUpUser",
  signUpUserThunk
);

const userAuthSlice = createSlice({
  name: "userAuth",
  initialState,
  reducers: {
    clearState: (state) => {
      state.user = {
        id: 0,
        email: "",
        password: "",
      };
      state.error = "";
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signUpUser.pending, (state: any) => {
      state.isLoading = true;
    });
    builder.addCase(signUpUser.fulfilled, (state: any, { payload }) => {
      state.isLoading = false;

      state.user = payload;
    });
    builder.addCase(signUpUser.rejected, (state: any, { payload }) => {
      state.isLoading = false;

      state.error = payload;
    });
    builder.addCase(loginUser.pending, (state: any) => {
      state.isLoading = true;
    });
    builder.addCase(loginUser.fulfilled, (state: any, { payload }) => {
      const { data: user } = payload;

      state.isLoading = false;
      state.user = user;
    });
    builder.addCase(loginUser.rejected, (state: any, { payload }) => {
      state.isLoading = false;

      state.error = payload;
    });
    builder.addCase(signOutUser.pending, (state: any) => {
      state.isLoading = true;
    });
    builder.addCase(signOutUser.fulfilled, (state: any) => {
      state.isLoading = false;
    });
    builder.addCase(signOutUser.rejected, (state: any, { payload }) => {
      state.isLoading = false;

      state.error = payload;
    });
  },
});

export const { clearState } = userAuthSlice.actions;

export const authReducer = userAuthSlice.reducer;
