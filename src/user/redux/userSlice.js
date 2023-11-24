import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { userLocalStorage } from "../api/localService";
import { https } from "../api/config";
import { clearPopup } from "./popupSlice";
import { notification } from "antd";
import { userServ } from "../api/api";

const initialState = {
  user: userLocalStorage.get(),
  infoUser: {},
  loading: false,
  bookedRooms: [],
};

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (userData, { dispatch }) => {
    try {
      const response = await https.post("/auth/signup", userData);
      if (response.status === 200) {
        const loginResponse = await https.post("/auth/signin", {
          email: userData.email,
          password: userData.password,
        });
        dispatch(setLogin(loginResponse.data.content.user));
        notification.success({ message: "Tạo tài khoản thành công !" });
        dispatch(clearPopup({ popup: "" }));
        userLocalStorage.set(loginResponse.data.content.user);
        return loginResponse.data.content.user;
      }
    } catch (error) {
      notification.error({ message: "Tạo tài khoản thành công !" });
      throw error;
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (userData, { dispatch }) => {
    try {
      const response = await https.post("/auth/signin", userData);
      if (response.status === 200) {
        dispatch(setLogin(response.data.content));
        userLocalStorage.set(response.data.content);
        notification.success({ message: "Đăng nhập thành công !" });
        dispatch(clearPopup({ popup: "" }));
        setTimeout(() => {
          window.location.reload();
        }, 200);
        return response.data.content;
      }
    } catch (error) {
      notification.error({ message: error.response.data.content });
      throw error;
    }
  }
);

export const updateProfile = createAsyncThunk(
  "user/updateProfile",
  async ({ profileData, id }, { dispatch }) => {
    try {
      const response = await https.put(`/users/${id}`, profileData);
      if (response.status === 200) {
        const setDataUpdate = {
          token: userLocalStorage.get()?.token,
          user: response.data.content,
        };
        dispatch(setLogin(setDataUpdate));
        userLocalStorage.set(setDataUpdate);
        dispatch(clearPopup({ popup: "" }));
        notification.success({ message: "Cập nhật tài khoản thành công" });
        return response.data.content;
      }
    } catch (error) {
      notification.error({
        message:
          error.response.data.content || "Có lỗi xảy ra, vui lòng thử lại",
      });
      throw error;
    }
  }
);

export const updateAvatar = createAsyncThunk(
  "user/updateAvatar",
  async (formFile, { dispatch }) => {
    try {
      const bodyFormData = new FormData();
      bodyFormData.append("formFile", formFile);

      const response = await https.post("/users/upload-avatar", bodyFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        dispatch(setLogin(response.data.content));
        userLocalStorage.set(response.data.content);
        notification.success({ message: "Cập nhật tài khoản thành công" });
        return response.data.content;
      }
    } catch (error) {
      notification.error({
        message:
          error.response?.data.content || "Có lỗi xảy ra, vui lòng thử lại",
      });
      throw error;
    }
  }
);

export const getListBookedRooms = createAsyncThunk(
  "user/getListBookedRooms",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await userServ.bookedRooms({ id });
      console.log(response);
      return response.data.content;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload;
    },
    setInfoUser: (state, { payload }) => {
      state.infoUser = payload;
    },
    removeLogin: (state) => {
      state.user = null;
    },
    setComments: (state, action) => {
      state.comments = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state) => {
        state.loading = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state) => {
        state.loading = false;
      })
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        // Handle state updates for a successful profile update
        state.loading = false;
      })
      .addCase(updateProfile.rejected, (state) => {
        state.loading = false;
      })
      // Get list bookedRooms by userId
      .addCase(getListBookedRooms.fulfilled, (state, action) => {
        state.loading = false;
        state.bookedRooms = action.payload;
        state.error = null;
      });
  },
});

export const { setInfoUser, removeLogin, setLogin } = userSlice.actions;
export default userSlice.reducer;
