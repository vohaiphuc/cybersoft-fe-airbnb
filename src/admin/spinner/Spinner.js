import React, { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners";
import { useSelector } from "react-redux";

export default function Spinner() {
  const { isLoading } = useSelector((state) => state.spinnerSlice);
  return isLoading ? (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: "black",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 999,
      }}
    >
      <ClipLoader color="#36d7b7" speedMultiplier={1} size={35} />
    </div>
  ) : null;
}
