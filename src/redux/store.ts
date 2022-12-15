import { authReducer } from "./../features/user/userAuthSlice";
import { vaccineReducer } from "./../features/vaccine/vaccineSlice";

import type { PreloadedState } from "@reduxjs/toolkit";

import { combineReducers, configureStore } from "@reduxjs/toolkit";

export const allReducers = combineReducers({
  auth: authReducer,
  vaccine: vaccineReducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: allReducers,
    preloadedState,
  });
};

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof allReducers>;

export type AppStore = ReturnType<typeof setupStore>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore["dispatch"];
