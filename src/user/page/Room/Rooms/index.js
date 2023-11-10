import React, { useEffect, useState } from "react";
import { getRoomsData } from "user/api/api";
import Card from "./Card";
import { Empty } from "antd";

const Rooms = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      try {
        const res = await getRoomsData();
        if (mounted) {
          setRooms(res?.data?.content);
        }
      } catch (error) {
        throw error;
      }
    };

    fetchData();

    return () => {
      mounted = false;
    };
  }, []);

  if (!rooms.length) return <Empty />;
  return (
    <div className="container px-4 mx-auto py-6 lg:py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-4 gap-4">
      {rooms.map((item) => (
        <Card key={item.id} data={item} />
      ))}
    </div>
  );
};

export default React.memo(Rooms);
