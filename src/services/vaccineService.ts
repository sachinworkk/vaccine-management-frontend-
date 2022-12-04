import { http } from "./http";

export const getVaccines = async () => {
  return http.get("/vaccine");
};

export const postVaccine = async (payload: object) => {
  return http.post("/vaccine", payload);
};
