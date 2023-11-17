import { Button, Form, Input, Rate, notification } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editComment, postComment } from "../../../../redux/commentSlice";
import { getCurrentDate } from "./utils";

const desc = ["terrible", "bad", "normal", "good", "wonderful"];

const CommentForm = ({ editing, id, commentId, setEditing }) => {
  const [rating, setRating] = useState(4);
  const { user } = useSelector((state) => state?.userSlice?.user || {});
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const currentDate = getCurrentDate();

  const handlePostComment = (values) => {
    const { comment } = values || {};
    const data = {
      id: commentId || id,
      maPhong: id,
      maNguoiBinhLuan: user?.id,
      ngayBinhLuan: currentDate,
      noiDung: comment,
      saoBinhLuan: rating,
    };
    if (editing) {
      setEditing("");
      if (commentId) {
        dispatch(editComment({ id: commentId, commentData: data }));
      } else {
        notification.success({
          message: "An error occurred. Please try later!.",
        });
      }
    } else {
      dispatch(postComment({ commentData: data }));
    }

    // Clear the form after submission
    form.resetFields();
  };
  console.log(editing);

  useEffect(() => {
    form.setFieldsValue({ comment: editing });
  }, [editing, form]);

  return (
    <>
      <Rate
        className="pb-4"
        tooltips={desc}
        onChange={setRating}
        value={rating}
      />
      <Form
        autoFocus={editing}
        defaultValue={{ comment: editing }}
        form={form}
        onFinish={handlePostComment}
        className="mb-3"
      >
        <Form.Item
          name="comment"
          rules={[
            {
              required: true,
              message: "Please enter your comment",
            },
          ]}
        >
          <Input.TextArea
            placeholder="Write a comment..."
            rows={3}
            className="w-full text-sm text-gray-900 rounded-md p-3"
          />
        </Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center bg-primary-700 rounded-lg focus:ring-4 text-white bg-red-400 hover:bg-red-600 transition focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
        >
          {editing ? "Update" : "Post"} comment
        </Button>
      </Form>
    </>
  );
};

export default React.memo(CommentForm);
