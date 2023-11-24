import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { getListBookedRooms } from "../../redux/userSlice";
import NoData from "../../component/NoData";

export default function BookedRooms() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state?.userSlice?.user || {});
  const { bookedRooms } = useSelector((state) => state?.userSlice || []);
  console.log(bookedRooms, user);

  useEffect(() => {
    if (user?.id) {
      dispatch(getListBookedRooms({ id: user?.id }));
    }
  }, [user?.id, dispatch]);

  if (!user?.id) return null;
  if (!bookedRooms?.length) return <NoData />;

  return (
    <div className="container mx-auto px-4">
      <Helmet>
        <title>Booked rooms</title>
        <meta name="description" content="Booked rooms page of Airbnb" />
      </Helmet>
      <div className="mt-5 prose py-4">
        Data: ({bookedRooms?.length || 0})
        <pre>{JSON.stringify(bookedRooms, null, 2)}</pre>
      </div>
    </div>
  );
}
