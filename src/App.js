import { BrowserRouter, Route, Routes } from "react-router-dom";
import _ from "lodash";
import { userRoute } from "./user/route/userRoute";
import { adminRoute } from "./admin/route/adminRoute";
import Popup from "./user/component/Popup";
import ModalBg from "./user/component/Modal/ModalBg";
import MenuMobile from "./user/component/MenuMobile/MenuMobile";

function App() {
  const createRoutes = (routeList) =>
    _.values(routeList).map(({ path, element }) => (
      <Route key={path} path={path} element={element} />
    ));

  return (
    <>
      <ModalBg />
      <BrowserRouter>
        <Routes>
          {createRoutes(userRoute)}
          {createRoutes(adminRoute)}
        </Routes>
        <Popup />
        <MenuMobile />
      </BrowserRouter>
    </>
  );
}

export default App;
