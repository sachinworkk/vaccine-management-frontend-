import { http, multipartFormHttp } from "./http";

export const getVaccines = async () => {
  return http.get("/vaccine");
};

export const getVaccineById = async (id: number) => {
  return http.get(`/vaccine/${id}`);
};

export const postVaccine = async (payload: object) => {
  return multipartFormHttp.post("/vaccine", payload);
};

export const deleteVaccine = async (id: number) => {
  return http.delete(`/vaccine/${id}`);
};

export const editVaccine = async (id: number, payload: object) => {
  return multipartFormHttp.put(`/vaccine/${id}`, payload);
};
