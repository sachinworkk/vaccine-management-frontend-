import {
  getVaccines,
  postVaccine,
  editVaccine,
  deleteVaccine,
  getVaccineById,
} from "./../../services/vaccineService";

export const getVaccinesThunk = async ({}, { rejectWithValue }: any) => {
  try {
    const resp = await getVaccines();

    return resp;
  } catch (error: any) {
    return rejectWithValue(error);
  }
};

export const getVaccineByIdThunk = async (
  id: number,
  { rejectWithValue }: any
) => {
  try {
    const resp = await getVaccineById(id);

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

export const editVaccineThunk = async (
  payload: any,
  { rejectWithValue }: any
) => {
  try {
    const resp = await editVaccine(payload.id, payload.data);

    return resp;
  } catch (error: any) {
    return rejectWithValue(error.response);
  }
};

export const deleteVaccineThunk = async (id: any, { rejectWithValue }: any) => {
  try {
    const resp = await deleteVaccine(id);

    return resp;
  } catch (error: any) {
    return rejectWithValue(error.response);
  }
};
