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
import Login from "../page/Login/Login";
import Register from "../page/Register/Register";
import Account from "../page/Account/Account";
import PageNotFound from "../page/404/PageNotFound";

export const userRoute = {
    home: { path: "/", element: <Home /> },
    room: { path: "/room", element: <Room /> },
    detail: { path: "/room/:id", element: <Room />, id: (id) => `/room/${id}` },
    location: { path: "/location/:city", element: <Location /> },
    login: { path: "/login", element: <Login /> },
    register: { path: "/register", element: <Register /> },
    account: { path: "/account", element: <Account /> },
    other: { path: "*", element: <PageNotFound /> },
}