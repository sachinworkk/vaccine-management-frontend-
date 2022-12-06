import { http } from "./http";

export const loginUser = async (payload: object) => {
  return http.post("/signin", payload);
};

export const signOutUser = async () => {
  return http.delete("/signout");
};

export const signUpUser = async (payload: object) => {
  return http.post("/signup", payload);
};
