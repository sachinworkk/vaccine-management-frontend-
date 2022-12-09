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

    return resp?.data?.vaccines;
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

    return resp?.data?.vaccine;
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

    return resp?.data;
  } catch (error: any) {
    if (error.response.data.type === "ValidationError") {
      return rejectWithValue({
        details: "Invalid Form Data",
      });
    }

    return rejectWithValue(error.response?.data);
  }
};

export const editVaccineThunk = async (
  payload: any,
  { rejectWithValue }: any
) => {
  try {
    const resp = await editVaccine(payload.id, payload.data);

    return resp?.data;
  } catch (error: any) {
    if (error.response.data.type === "ValidationError") {
      return rejectWithValue({
        details: "Invalid Form Data",
      });
    }

    return rejectWithValue(error.response?.data);
  }
};

export const deleteVaccineThunk = async (id: any, { rejectWithValue }: any) => {
  try {
    const resp = await deleteVaccine(id);

    return resp?.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data);
  }
};
