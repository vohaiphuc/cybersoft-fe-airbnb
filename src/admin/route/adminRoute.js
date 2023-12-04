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
      <PrivateRoute>
        <MainLayout>
          <Booking />
        </MainLayout>
      </PrivateRoute>
    ),
  },
  location: {
    path: "/admin/location",
    element: (
      <PrivateRoute>
        <MainLayout>
          <Location />
        </MainLayout>
      </PrivateRoute>
    ),
  },
  login: { path: "/admin/login", element: <Login /> },
  room: {
    path: "/admin/room",
    element: (
      <PrivateRoute>
        <MainLayout>
          <Room />
        </MainLayout>
      </PrivateRoute>
    ),
  },
  user: {
    path: "/admin/user",
    element: (
      <PrivateRoute>
        <MainLayout>
          <User />
        </MainLayout>
      </PrivateRoute>
    ),
  },
  other: { path: "admin/*", element: <PageNotFound /> },
};
