import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { notification } from "antd";
import { https } from "../api/config";

const initialState = {
  comments: [],
  loading: false,
};

export const postComment = createAsyncThunk(
  "comments/postComment",
  async ({ commentData }) => {
    try {
      const response = await https.post(`/binh-luan`, commentData);
      if (response.status === 201) {
        const newComment = response.data.content;
        notification.success({
          message: response?.data.message || "Comment posted successfully",
        });
        return newComment;
      }
    } catch (error) {
      notification.error({
        message:
          error.response?.data.content ||
          "Error posting comment, please try again",
      });
      throw error;
    }
  }
);

export const editComment = createAsyncThunk(
  "comments/editComment",
  async ({ id, commentData }) => {
    try {
      const response = await https.put(`/binh-luan/${id}`, commentData);
      console.log(response);
      if (response.status === 200) {
        const editedComment = response.data.content;
        notification.success({
          message: response?.data.message || "Comment edited successfully",
        });
        return editedComment;
      }
    } catch (error) {
      notification.error({
        message:
          error.response?.data.content ||
          "Error editing comment, please try again",
      });
      throw error;
    }
  }
);

export const removeComment = createAsyncThunk(
  "comments/removeComment",
  async (id) => {
    try {
      const response = await https.delete(`/binh-luan/${id}`);
      if (response.status === 200) {
        notification.success({
          message: response?.data.message || "Comment removed successfully",
        });
        return id;
      }
    } catch (error) {
      notification.error({
        message:
          error.response?.data.content ||
          "Error removing comment, please try again",
      });
      throw error;
    }
  }
);

export const getComments = createAsyncThunk(
  "comments/getComments",
  async (maPhong) => {
    try {
      const response = await https.get(
        `/binh-luan/lay-binh-luan-theo-phong/${maPhong}`
      );
      if (response.status === 200) {
        const comments = response.data.content;
        return comments;
      }
    } catch (error) {
      notification.error({
        message:
          error.response?.data.content ||
          "Error getting comments, please try again",
      });
      throw error;
    }
  }
);

const commentsSlice = createSlice({
  name: "commentsSlice",
  initialState,
  reducers: {
    // Additional reducers for comment-related actions if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(postComment.pending, (state) => {
        state.loading = true;
      })
      .addCase(postComment.fulfilled, (state, action) => {
        state.loading = false;

        console.log("Action Payload:", action.payload);

        // Check if action.payload is not undefined before updating state
        if (action.payload) {
          state.comments = [...state.comments, action.payload];
        } else {
          console.error("postComment.fulfilled action payload is undefined");
        }
      })

      .addCase(postComment.rejected, (state) => {
        state.loading = false;
      })
      .addCase(editComment.pending, (state) => {
        state.loading = true;
      })
      .addCase(editComment.fulfilled, (state, action) => {
        state.loading = false;
        // Update the comments array in the state with the edited comment
        const editedComment = action.payload;
        const updatedComments = state.comments.map((comment) =>
          comment.id === editedComment.id ? editedComment : comment
        );
        state.comments = updatedComments;
      })
      .addCase(editComment.rejected, (state) => {
        state.loading = false;
      })
      .addCase(removeComment.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeComment.fulfilled, (state, action) => {
        state.loading = false;
        // Remove the comment from the state based on the ID
        const removedCommentId = action.payload;
        state.comments = state.comments.filter(
          (comment) => comment.id !== removedCommentId
        );
      })
      .addCase(removeComment.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getComments.pending, (state) => {
        state.loading = true;
      })
      .addCase(getComments.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload;
      })
      .addCase(getComments.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default commentsSlice.reducer;
