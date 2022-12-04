import { http, multipartFormHttp } from "./http";

export const getVaccines = async () => {
  return http.get("/vaccine");
};

export const postVaccine = async (payload: object) => {
  return multipartFormHttp.post("/vaccine", payload);
};
