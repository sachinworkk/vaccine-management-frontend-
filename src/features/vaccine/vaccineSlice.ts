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
    numberOfDoses: 0,
    vaccineImageUrl: "",
  },
  isLoading: false,
  isPerformingAction: false,
};

const vaccineSlice = createSlice({
  name: "vaccine",
  initialState,
  reducers: {
    selectVaccine: (state, { payload }) => {
      state.selectedVaccine = payload;
    },
    resetSelectedVaccine: (state) => {
      state.selectedVaccine = {
        id: "",
        name: "",
        description: "",
        stage: "",
        isMandatory: false,
        numberOfDoses: 0,
        vaccineImageUrl: "",
      };
      state.isLoading = false;
      state.isPerformingAction = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getVaccines.pending, (state: any) => {
      state.isLoading = true;
    });
    builder.addCase(getVaccines.fulfilled, (state: any, { payload }) => {
      state.isLoading = false;

      state.vaccines = payload;
    });
    builder.addCase(getVaccines.rejected, (state: any, { payload }: any) => {
      state.isLoading = false;
    });

    builder.addCase(getVaccineById.pending, (state: any) => {
      state.isLoading = true;
    });
    builder.addCase(getVaccineById.fulfilled, (state: any, { payload }) => {
      state.isLoading = false;

      state.selectedVaccine = payload;
    });
    builder.addCase(getVaccineById.rejected, (state: any, { payload }: any) => {
      state.isLoading = false;
    });

    builder.addCase(editVaccine.pending, (state: any) => {
      state.isPerformingAction = true;
    });
    builder.addCase(editVaccine.fulfilled, (state: any) => {
      state.isEdited = true;

      state.isPerformingAction = false;
    });
    builder.addCase(editVaccine.rejected, (state: any) => {
      state.isPerformingAction = false;
    });

    builder.addCase(postVaccine.pending, (state: any) => {
      state.isPerformingAction = true;
    });
    builder.addCase(postVaccine.fulfilled, (state: any) => {
      state.isPerformingAction = false;
    });
    builder.addCase(postVaccine.rejected, (state: any) => {
      state.isPerformingAction = false;
    });

    builder.addCase(deleteVaccine.pending, (state: any) => {
      state.isPerformingAction = true;
    });
    builder.addCase(deleteVaccine.fulfilled, (state: any) => {
      state.isPerformingAction = false;
    });
    builder.addCase(deleteVaccine.rejected, (state: any) => {
      state.isPerformingAction = false;
    });
  },
});

export const { selectVaccine, resetSelectedVaccine } = vaccineSlice.actions;

export const vaccineReducer = vaccineSlice.reducer;
