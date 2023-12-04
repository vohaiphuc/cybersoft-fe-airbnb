import React, { useEffect } from "react";
import "./asset/style.scss";
import { useNavigate } from "react-router-dom";
import { adminRoute } from "../../route/adminRoute";

export default function Home() {
  const navigate = useNavigate()
  useEffect(() => {
    navigate(adminRoute.user.path)
  }, [])

  return <div>Đang chuyển hướng</div>;
}
