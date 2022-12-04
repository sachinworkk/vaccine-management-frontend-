import { useNavigate } from "react-router-dom";
import { loginUserThunk, signUpUserThunk } from "./userThunk";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { saveAccessToken, saveRefreshToken } from "../../utils/localStorage";

const initialState = {
  user: {
    id: 0,
    email: "",
    password: "",
  },
  isLoading: false,
  isLoginSuccess: false,
  error: "",
};

export const loginUser = createAsyncThunk("userAuth/loginUser", loginUserThunk);
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
      state.isLoading = false;
      state.isLoginSuccess = false;
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signUpUser.pending, (state: any) => {
      state.isLoading = true;
    });
    builder.addCase(signUpUser.fulfilled, (state: any, { payload }) => {
      const { data: user } = payload;

      state.isLoading = false;
      state.user = user;
      state.isLoginSuccess = true;
    });
    builder.addCase(signUpUser.rejected, (state: any, { payload }: any) => {
      state.isLoading = false;

      state.error = payload.data.details;
    });
    builder.addCase(loginUser.pending, (state: any) => {
      state.isLoading = true;
    });
    builder.addCase(loginUser.fulfilled, (state: any, { payload }) => {
      const { data: user } = payload;

      state.isLoading = false;
      state.user = user;
      state.isLoginSuccess = true;

      saveAccessToken(payload.data.accessToken);
      saveRefreshToken(payload.data.refreshToken);
    });
    builder.addCase(loginUser.rejected, (state: any, { payload }: any) => {
      state.isLoading = false;

      state.isLoginSuccess = false;

      state.error = payload.data.details;
    });
  },
});

export const { clearState } = userAuthSlice.actions;

export const authReducer = userAuthSlice.reducer;
