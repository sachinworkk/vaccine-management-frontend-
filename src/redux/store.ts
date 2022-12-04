import { authReducer } from "./../features/user/userAuthSlice";
import { vaccineReducer } from "./../features/vaccine/vaccineSlice";

import { combineReducers, configureStore } from "@reduxjs/toolkit";

export const allReducers = combineReducers({
  auth: authReducer,
  vaccine: vaccineReducer,
});

const store = configureStore({
  reducer: allReducers,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
