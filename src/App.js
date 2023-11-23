import { BrowserRouter, Route, Routes } from "react-router-dom";
import _ from "lodash";
import { userRoute } from "./user/route/userRoute";
import { adminRoute } from "./admin/route/adminRoute";
import Spinner from "./admin/spinner/Spinner";
function App() {
  const createRoutes = (routeList) =>
    _.values(routeList).map(({ path, element }) => (
      <Route key={path} path={path} element={element} />
    ));

  return (
    <BrowserRouter>
      {/* <Spinner /> */}
      <Routes>
        {createRoutes(userRoute)}
        {createRoutes(adminRoute)}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
