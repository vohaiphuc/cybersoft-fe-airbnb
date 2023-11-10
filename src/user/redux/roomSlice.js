// roomSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { roomServ } from "../api/api";

export const fetchRoomDetail = createAsyncThunk(
  "room/fetchRoomDetail",
  async (id, { rejectWithValue }) => {
    try {
      const response = await roomServ.getDetaiRoomData({ id });
      return response.data.content;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const roomSlice = createSlice({
  name: "rooms",
  initialState: {
    rooms: [],
    roomDetail: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get rooms list
      //
      // Get Room detail
      .addCase(fetchRoomDetail.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRoomDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.roomDetail = action.payload;
        state.error = null;
      })
      .addCase(fetchRoomDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default roomSlice.reducer;
