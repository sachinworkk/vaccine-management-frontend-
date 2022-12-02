import { UserLogin } from "../../types/userLogin";

import { loginUser, signUpUser } from "./../../services/userService";

export const loginUserThunk = async (
  payload: UserLogin,
  { rejectWithValue }: any
) => {
  try {
    const resp = await loginUser(payload);

    return resp;
  } catch (error: any) {
    return rejectWithValue(error.response);
  }
};

export const signUpUserThunk = async (
  payload: UserLogin,
  { rejectWithValue }: any
) => {
  try {
    const resp = await signUpUser(payload);

    return resp;
  } catch (error: any) {
    return rejectWithValue(error.response);
  }
};
