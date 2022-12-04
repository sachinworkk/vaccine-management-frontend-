import { getVaccines, postVaccine } from "./../../services/vaccineService";

export const getVaccinesThunk = async ({}, { rejectWithValue }: any) => {
  try {
    const resp = await getVaccines();

    return resp;
  } catch (error: any) {
    return rejectWithValue(error);
  }
};

export const postVaccineThunk = async (
  payload: any,
  { rejectWithValue }: any
) => {
  try {
    const resp = await postVaccine(payload);

    return resp;
  } catch (error: any) {
    return rejectWithValue(error.response);
  }
};
