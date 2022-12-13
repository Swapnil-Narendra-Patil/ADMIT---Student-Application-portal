import { combineReducers } from "@reduxjs/toolkit";
import alertReducer from "./alert";
import applicationReducer from "./Application";
import authReducer from "./authReducer";
import universityReducer from "./universityReducer";
import { apiSlice } from "../api/apiSlice";

export default combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  authReducer,
  alertReducer,
  universityReducer,
  applicationReducer
});
