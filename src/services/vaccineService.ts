import { http } from "./http";

export const getVaccines = async () => {
  return http.get("/vaccine");
};

export const signUpUser = async (payload: object) => {
  return http.post("/signup", payload);
};
