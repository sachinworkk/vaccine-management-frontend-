import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getVaccinesThunk, postVaccineThunk } from "./vaccineThunk";

export const getVaccines = createAsyncThunk(
  "vaccine/getVaccines",
  getVaccinesThunk
);

export const postVaccine = createAsyncThunk(
  "vaccine/postVaccine",
  postVaccineThunk
);

const initialState = {
  vaccines: [],
  vaccinePayload: {},
  selectedVaccine: null,
  isLoading: false,
  error: "",
};

const vaccineSlice = createSlice({
  name: "vaccine",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getVaccines.fulfilled, (state: any, { payload }) => {
      state.isLoading = false;
    });
    builder.addCase(getVaccines.rejected, (state: any, { payload }: any) => {
      state.isLoading = false;

      state.error = payload.response.data;
    });
    builder.addCase(getVaccines.pending, (state: any) => {
      state.isLoading = true;
    });
    builder.addCase(postVaccine.pending, (state: any) => {
      state.isLoading = true;
    });
    builder.addCase(postVaccine.fulfilled, (state: any, { payload }) => {
      state.isLoading = false;
    });
    builder.addCase(postVaccine.rejected, (state: any, { payload }: any) => {
      state.isLoading = false;

      state.error = payload.data.details;
    });
  },
});

export const vaccineReducer = vaccineSlice.reducer;
