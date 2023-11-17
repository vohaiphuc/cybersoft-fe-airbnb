import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Info from "./Info";
import Property from "./Property";
import { useDispatch, useSelector } from "react-redux";
import { LoadingOutlined } from "@ant-design/icons";
import { fetchRoomDetail } from "../../../redux/roomSlice";
import { Helmet } from "react-helmet";
import Comment from "./Comment";
import { getComments } from "../../../redux/commentSlice";

const RoomDetail = () => {
  const dispatch = useDispatch();
  const { roomDetail, loading } = useSelector((state) => state?.roomSlice);
  const { id } = useParams();

  const navigate = useNavigate();
  useEffect(() => {
    if (!id) {
      navigate("/");
    }
  }, [navigate, id]);

  useEffect(() => {
    dispatch(fetchRoomDetail(id));
    dispatch(getComments(id));
  }, [dispatch, id]);

  if (loading) {
    return <LoadingOutlined />;
  }

  return (
    <article className="container px-4 mx-auto py-6 lg:py-10">
      <Helmet>
        <title>{roomDetail?.tenPhong}</title>
        <meta name="description" content={roomDetail?.moTa} />
      </Helmet>
      <Info data={roomDetail} />
      <Property data={roomDetail} />
      <Comment id={id} />
    </article>
  );
};

export default React.memo(RoomDetail);
