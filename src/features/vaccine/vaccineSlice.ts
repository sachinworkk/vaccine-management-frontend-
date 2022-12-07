import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  editVaccineThunk,
  getVaccinesThunk,
  postVaccineThunk,
  deleteVaccineThunk,
  getVaccineByIdThunk,
} from "./vaccineThunk";

export const getVaccines = createAsyncThunk(
  "vaccine/getVaccines",
  getVaccinesThunk
);

export const getVaccineById = createAsyncThunk(
  "vaccine/getVaccineById",
  getVaccineByIdThunk
);

export const postVaccine = createAsyncThunk(
  "vaccine/postVaccine",
  postVaccineThunk
);

export const deleteVaccine = createAsyncThunk(
  "vaccine/deleteVaccine",
  deleteVaccineThunk
);

export const editVaccine = createAsyncThunk(
  "vaccine/editVaccine",
  editVaccineThunk
);

const initialState = {
  vaccines: [],
  vaccinePayload: {},
  selectedVaccine: {
    id: "",
    name: "",
    description: "",
    stage: "",
    isMandatory: false,
    numberOfDoses: null,
    vaccineImageUrl: "",
  },
  error: "",
  isAdded: false,
  isLoading: false,
  isEdited: false,
  isDeleted: false,
  isPerformingAction: false,
};

const vaccineSlice = createSlice({
  name: "vaccine",
  initialState,
  reducers: {
    selectVaccine: (state, { payload }) => {
      state.selectedVaccine = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getVaccines.pending, (state: any) => {
      state.isLoading = true;
    });
    builder.addCase(getVaccines.fulfilled, (state: any, { payload }) => {
      const { data: vaccines } = payload;

      state.isLoading = false;

      state.vaccines = vaccines.data.data;
    });
    builder.addCase(getVaccines.rejected, (state: any, { payload }: any) => {
      state.isLoading = false;

      state.error = payload.response.data;
    });

    builder.addCase(getVaccineById.pending, (state: any) => {
      state.isLoading = true;
    });
    builder.addCase(getVaccineById.fulfilled, (state: any, { payload }) => {
      const { data: vaccine } = payload;

      state.isLoading = false;

      state.selectedVaccine = vaccine.data;
    });
    builder.addCase(getVaccineById.rejected, (state: any, { payload }: any) => {
      state.isLoading = false;

      state.error = payload.response.data;
    });

    builder.addCase(editVaccine.pending, (state: any) => {
      state.isPerformingAction = true;
    });
    builder.addCase(editVaccine.fulfilled, (state: any, { payload }) => {
      const { data: vaccine } = payload;

      state.isEdited = true;

      state.isAdded = false;
      state.isDeleted = false;

      state.isPerformingAction = false;

      state.selectedVaccine = vaccine.data;
    });
    builder.addCase(editVaccine.rejected, (state: any, { payload }: any) => {
      state.isAdded = false;
      state.isEdited = false;
      state.isDeleted = false;

      state.isPerformingAction = false;

      state.error = payload.response.data;
    });

    builder.addCase(postVaccine.pending, (state: any) => {
      state.isPerformingAction = true;
    });
    builder.addCase(postVaccine.fulfilled, (state: any) => {
      state.isPerformingAction = false;

      state.isAdded = true;

      state.isEdited = false;
      state.isDeleted = false;
    });
    builder.addCase(postVaccine.rejected, (state: any, { payload }: any) => {
      state.isAdded = false;
      state.isEdited = false;
      state.isDeleted = false;

      state.isPerformingAction = false;

      state.error = payload.data.details;
    });

    builder.addCase(deleteVaccine.pending, (state: any) => {
      state.isPerformingAction = true;
    });
    builder.addCase(deleteVaccine.fulfilled, (state: any) => {
      state.isDeleted = true;

      state.isAdded = false;
      state.isEdited = false;

      state.isPerformingAction = false;
    });
    builder.addCase(deleteVaccine.rejected, (state: any, { payload }: any) => {
      state.isAdded = false;
      state.isEdited = false;
      state.isDeleted = false;

      state.isPerformingAction = false;

      state.error = payload.data.details;
    });
  },
});

export const { selectVaccine } = vaccineSlice.actions;

export const vaccineReducer = vaccineSlice.reducer;
