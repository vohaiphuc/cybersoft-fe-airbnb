/**
 * userRoute được sử dụng để tạo Route trong App.js
 *
 *
 *
 * Khi sử dụng với useNavigate()
 * Thay vì: navigate("/login")
 * Sẽ là: navigate(userRoute.login.path)
 */

import Home from "../page/Home/Home";
import Room from "../page/Room/Room";
import Location from "../page/Location/Location";
import PageNotFound from "../page/404/PageNotFound";
import DefaultLayout from "../layout/DefaultLayout";
import Profile from "../page/Profile";
import PrivateRoute from "./guardRoute";

export const userRoute = {
  home: {
    path: "/",
    element: (
      <DefaultLayout>
        <Home />
      </DefaultLayout>
    ),
  },

  detail: {
    path: "/room/:id",
    element: (
      <DefaultLayout>
        <Room />
      </DefaultLayout>
    ),
    id: (id) => `/room/${id}`,
  },

  location: {
    path: "/location/:id",
    element: (
      <DefaultLayout>
        <Location />
      </DefaultLayout>
    ),
    id: (id) => `/location/${id}`
  },

  account: {
    path: "/profile",
    element: (
      <DefaultLayout>
        <PrivateRoute>
          <Profile />
        </PrivateRoute>
      </DefaultLayout>
    ),
  },

  other: {
    path: "*",
    element: (
      <DefaultLayout>
        <PageNotFound />
      </DefaultLayout>
    ),
  },
}