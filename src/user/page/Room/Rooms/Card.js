import React from "react";
import { Card } from "antd";
import { truncateWords } from "user/utils/libs";
import { Link } from "react-router-dom";
import LazyImage from "../Image";

const { Meta } = Card;

const RoomCard = ({ data }) => {
  const { tenPhong, hinhAnh, moTa, id } = data || {};
  return (
    <Link to={`/room/${id}`}>
      <Card hoverable cover={<LazyImage alt={tenPhong} src={hinhAnh} />}>
        <Meta title={tenPhong} description={truncateWords(moTa, 20)} />
      </Card>
    </Link>
  );
};
export default React.memo(RoomCard);
