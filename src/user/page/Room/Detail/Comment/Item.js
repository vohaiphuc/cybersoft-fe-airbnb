import { Button, Popover } from "antd";
import React from "react";
import { format } from "date-fns";

const CommentItem = ({ comment, onDelete, isAdmin, onEdit }) => {
  const { saoBinhLuan, avatar, tenNguoiBinhLuan, ngayBinhLuan, noiDung, id } =
    comment || {};
  const popoverContent = (id, noiDung) => (
    <div id="dropdownComment1" className="z-10 rounded">
      <div
        className="py-1 text-sm text-gray-700"
        aria-labelledby="dropdownMenuIconHorizontalButton"
      >
        <Button
          onClick={() => onEdit(id, noiDung)}
          className="block border-none h-auto w-full text-left hover:!text-red-600 shadow-none"
        >
          Edit
        </Button>
        <Button
          onClick={() => onDelete(id)}
          className="block border-none h-auto w-full text-left hover:!text-red-600 shadow-none"
        >
          Remove
        </Button>
      </div>
    </div>
  );
  return (
    <article className="p-3 text-base rounded-lg">
      <footer className="flex justify-between items-center mb-2">
        <div className="flex">
          <div className="flex items-center mr-3 text-sm font-semibold">
            <img
              className="mr-2 w-6 h-6 rounded-full"
              src={
                avatar ||
                "https://cdn2.vectorstock.com/i/1000x1000/23/81/default-avatar-profile-icon-vector-18942381.jpg"
              }
              alt={tenNguoiBinhLuan}
            />
            <div className="space-y-1 flex flex-col">
              {tenNguoiBinhLuan}
              <time
                className="text-xs font-normal"
                dateTime={ngayBinhLuan.toString()}
                title={ngayBinhLuan.toString()}
              >
                {format(ngayBinhLuan, "dd/MM/yyyy")}
              </time>
            </div>
          </div>
          <span className="text-sm text-red-600 font-bold">{saoBinhLuan}*</span>
        </div>
        {isAdmin && (
          <Popover
            content={() => popoverContent(id, noiDung)}
            className="p-0"
            placement="right"
            trigger="click"
          >
            <button
              id="dropdownCommentButton"
              data-dropdown-toggle="dropdownComment"
              className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 rounded-lg focus:ring-4 focus:outline-none dark:focus:ring-gray-600"
              type="button"
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 16 3"
              >
                <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
              </svg>
              <span className="sr-only">Comment settings</span>
            </button>
          </Popover>
        )}
      </footer>
      <p>{noiDung}</p>
    </article>
  );
};

export default React.memo(CommentItem);
