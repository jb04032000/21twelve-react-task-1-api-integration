import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { loader } from "./basic/helpers";

const HomePage = lazy(() => import("./container/Pages/HomePage"));
const Nopagefound = lazy(() => import("./container/Pages/Nopagefound"));

function RoueConfig() {
  return (
    <Suspense
      fallback={
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "100vh" }}
        >
          {loader()}
        </div>
      }
    >
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="*" element={<Nopagefound />} />
      </Routes>
    </Suspense>
  );
}

export default RoueConfig;
