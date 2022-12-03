import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getVaccinesThunk } from "./vaccineThunk";

export const getVaccines = createAsyncThunk(
  "vaccine/getVaccines",
  getVaccinesThunk
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
  },
});

export const vaccineReducer = vaccineSlice.reducer;
