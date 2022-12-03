import { getVaccines } from "./../../services/vaccineService";

export const getVaccinesThunk = async ({}, { rejectWithValue }: any) => {
  try {
    const resp = await getVaccines();

    return resp;
  } catch (error: any) {
    return rejectWithValue(error);
  }
};
