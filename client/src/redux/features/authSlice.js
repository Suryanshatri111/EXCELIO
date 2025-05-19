import { createSlice } from "@reduxjs/toolkit";
import {
  saveUserToStorage,
  getUserFromStorage,
  clearUserFromStorage,
} from "../../utils/storageUtils";

const initialState = {
  userInfo: getUserFromStorage(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      const { rememberMe = true } = action.payload;
      saveUserToStorage(action.payload, rememberMe);
    },

    logout: (state) => {
      state.userInfo = null;
      clearUserFromStorage();
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
