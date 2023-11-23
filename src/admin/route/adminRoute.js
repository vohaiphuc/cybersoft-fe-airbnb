/**
 * adminRoute được sử dụng để tạo Route trong App.js
 *
 *
 *
 * Khi sử dụng với useNavigate()
 * Thay vì: navigate("/user")
 * Sẽ là: navigate(adminRoute.user.path)
 */

import Home from "../page/Home/Home";
import Booking from "../page/Booking/Booking";
import Location from "../page/Location/Location";
import Login from "../page/Login/Login";
import Room from "../page/Room/Room";
import User from "../page/User/User";
import PageNotFound from "../page/404/PageNotFound";
import MainLayout from "../layout";
import PrivateRoute from "../layout/PrivateRoute";

export const adminRoute = {
  home: {
    path: "/admin",
    element: (
      <PrivateRoute>
        <MainLayout>
          <Home />
        </MainLayout>
      </PrivateRoute>
    ),
  },
  booking: {
    path: "/admin/booking",
    element: (
      <MainLayout>
        <Booking />
      </MainLayout>
    ),
  },
  location: {
    path: "/admin/location",
    element: (
      <MainLayout>
        <Location />
      </MainLayout>
    ),
  },
  login: { path: "/admin/login", element: <Login /> },
  room: {
    path: "/admin/room",
    element: (
      <MainLayout>
        <Room />
      </MainLayout>
    ),
  },
  user: {
    path: "/admin/user",
    element: (
      <MainLayout>
        <User />
      </MainLayout>
    ),
  },
  other: { path: "admin/*", element: <PageNotFound /> },
};
