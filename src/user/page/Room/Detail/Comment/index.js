import React, { useMemo, useRef, useState } from "react";
import Form from "./Form";
import Item from "./Item";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "antd";
import { parseDate } from "./utils/date-uitl";
import { isBefore } from "date-fns";
import { removeComment } from "../../../../redux/commentSlice";

const Comments = ({ id }) => {
  const { comments } = useSelector((state) => state?.commentSlice);
  const [visibleItems, setVisibleItems] = useState(10);
  const dispatch = useDispatch();

  const [editing, setEditing] = useState("");
  const [commentId, setCommentId] = useState(null);
  const { user } = useSelector((state) => state?.userSlice?.user) || {};
  const commentRef = useRef(null);

  const isAdmin = useMemo(() => user?.role === "ADMIN", [user?.role]);

  const sortedComments = useMemo(() => {
    return [...comments]
      .map((e) => {
        const parsedDate = parseDate(e?.ngayBinhLuan);
        return {
          ...e,
          ngayBinhLuan: parsedDate,
        };
      })
      .filter((comment) => comment?.ngayBinhLuan !== null)
      .sort((a, b) => (isBefore(a?.ngayBinhLuan, b?.ngayBinhLuan) ? 1 : -1));
  }, [comments]);

  const handleDelete = (id) => {
    dispatch(removeComment(id));
  };

  const handleEdit = (id, noiDung) => {
    setEditing(noiDung);
    setCommentId(id);
    if (commentRef.current) {
      commentRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const loadMore = () => {
    setVisibleItems((prev) => prev + 10);
  };

  return (
    <section className="py-8 lg:py-16 antialiased" ref={commentRef}>
      <div className="max-w-2xl mx-auto px-4">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg lg:text-2xl font-bold">
            Discussion{" "}
            {sortedComments?.length ? `(${sortedComments?.length})` : ""}
          </h2>
        </div>
        <Form
          editing={editing}
          id={id}
          commentId={commentId}
          setEditing={setEditing}
        />
        {sortedComments?.length ? (
          <>
            {sortedComments?.slice(0, visibleItems).map((comment) => (
              <Item
                isAdmin={isAdmin}
                key={comment?.id}
                comment={comment}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            ))}
            {visibleItems < sortedComments?.length && (
              <Button
                className="mt-4 font-bold mx-auto rounded-lg flex justify-center"
                onClick={loadMore}
              >
                Load More
              </Button>
            )}
          </>
        ) : (
          <>Empty comment ...</>
        )}
      </div>
    </section>
  );
};

export default React.memo(Comments);
