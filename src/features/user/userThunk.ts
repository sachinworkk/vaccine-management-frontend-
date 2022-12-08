import { UserLogin } from "../../types/userLogin";

import {
  loginUser,
  signUpUser,
  signOutUser,
} from "./../../services/userService";

export const loginUserThunk = async (
  payload: UserLogin,
  { rejectWithValue }: any
) => {
  try {
    const resp = await loginUser(payload);

    return {
      user: resp?.data?.user,
      accessToken: resp?.data?.accessToken,
      refreshToken: resp?.data?.refreshToken,
    };
  } catch (error: any) {
    return rejectWithValue(error.response?.data);
  }
};

export const signOutUserThunk = async ({ rejectWithValue }: any) => {
  try {
    const resp = await signOutUser();

    return resp?.data?.details;
  } catch (error: any) {
    return rejectWithValue(error.response?.data);
  }
};

export const signUpUserThunk = async (
  payload: UserLogin,
  { rejectWithValue }: any
) => {
  try {
    const resp = await signUpUser(payload);

    return resp?.data?.details;
  } catch (error: any) {
    return rejectWithValue(error.response?.data);
  }
};
