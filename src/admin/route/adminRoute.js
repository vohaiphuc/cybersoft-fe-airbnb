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

export const adminRoute = {
    home: { path: "/admin", element: <Home /> },
    booking: { path: "/admin/booking", element: <Booking /> },
    location: { path: "/admin/location", element: <Location /> },
    login: { path: "/admin/login", element: <Login /> },
    room: { path: "/admin/room", element: <Room /> },
    user: { path: "/admin/user", element: <User /> },
    other: { path: "admin/*", element: <PageNotFound /> },
}