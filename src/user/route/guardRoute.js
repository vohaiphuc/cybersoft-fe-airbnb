import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state?.userSlice?.user || {});

  useEffect(() => {
    if (!user?.id && pathname === "/profile") {
      navigate("/");
    }
  }, [user?.id, pathname, navigate]);

  return <>{children}</>;
}
