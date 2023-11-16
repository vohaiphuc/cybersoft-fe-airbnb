import { createSlice } from "@reduxjs/toolkit";
import { userLocalStorage } from "../api/localService";

const initialState = {
  user: userLocalStorage.get(),
};

const adminSlice = createSlice({
  name: "adminSlice",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setLogin } = adminSlice.actions;
export default adminSlice.reducer;
