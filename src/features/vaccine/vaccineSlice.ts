import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  editVaccineThunk,
  getVaccinesThunk,
  postVaccineThunk,
  deleteVaccineThunk,
  getVaccineByIdThunk,
} from "./vaccineThunk";

export const getVaccinesReducer = createAsyncThunk(
  "vaccine/getVaccines",
  getVaccinesThunk
);

export const getVaccineByIdReducer = createAsyncThunk(
  "vaccine/getVaccineById",
  getVaccineByIdThunk
);

export const postVaccineReducer = createAsyncThunk(
  "vaccine/postVaccine",
  postVaccineThunk
);

export const deleteVaccineReducer = createAsyncThunk(
  "vaccine/deleteVaccine",
  deleteVaccineThunk
);

export const editVaccineReducer = createAsyncThunk(
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
    builder.addCase(getVaccinesReducer.pending, (state: any) => {
      state.isLoading = true;
    });
    builder.addCase(getVaccinesReducer.fulfilled, (state: any, { payload }) => {
      const { data: vaccines } = payload;

      state.isLoading = false;

      state.vaccines = vaccines.data.data;
    });
    builder.addCase(
      getVaccinesReducer.rejected,
      (state: any, { payload }: any) => {
        state.isLoading = false;

        state.error = payload.response.data;
      }
    );

    builder.addCase(getVaccineByIdReducer.pending, (state: any) => {
      state.isLoading = true;
    });
    builder.addCase(
      getVaccineByIdReducer.fulfilled,
      (state: any, { payload }) => {
        const { data: vaccine } = payload;

        state.isLoading = false;

        state.selectedVaccine = vaccine.data;
      }
    );
    builder.addCase(
      getVaccineByIdReducer.rejected,
      (state: any, { payload }: any) => {
        state.isLoading = false;

        state.error = payload.response.data;
      }
    );

    builder.addCase(editVaccineReducer.pending, (state: any) => {
      state.isPerformingAction = true;
    });
    builder.addCase(editVaccineReducer.fulfilled, (state: any, { payload }) => {
      const { data: vaccine } = payload;

      state.isEdited = true;

      state.isPerformingAction = false;

      state.selectedVaccine = vaccine.data;
    });
    builder.addCase(
      editVaccineReducer.rejected,
      (state: any, { payload }: any) => {
        console.log(payload);
        state.isPerformingAction = false;

        state.error = payload.response.data;
      }
    );

    builder.addCase(postVaccineReducer.pending, (state: any) => {
      state.isPerformingAction = true;
    });
    builder.addCase(postVaccineReducer.fulfilled, (state: any) => {
      state.isPerformingAction = false;

      state.isAdded = true;
    });
    builder.addCase(
      postVaccineReducer.rejected,
      (state: any, { payload }: any) => {
        state.isPerformingAction = false;

        state.error = payload.data.details;
      }
    );

    builder.addCase(deleteVaccineReducer.pending, (state: any) => {
      state.isPerformingAction = true;
    });
    builder.addCase(deleteVaccineReducer.fulfilled, (state: any) => {
      state.isPerformingAction = false;

      state.isDeleted = true;
    });
    builder.addCase(
      deleteVaccineReducer.rejected,
      (state: any, { payload }: any) => {
        state.isPerformingAction = false;

        state.error = payload.data.details;
      }
    );
  },
});

export const { selectVaccine } = vaccineSlice.actions;

export const vaccineReducer = vaccineSlice.reducer;
