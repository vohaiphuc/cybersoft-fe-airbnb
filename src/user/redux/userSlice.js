import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: [],
};

export const registerUser = (first) => {};
export const loginUser = (first) => {};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setLogin } = userSlice.actions;
export default userSlice.reducer;
