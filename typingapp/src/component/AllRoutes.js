
import React from "react";
import { Routes, Route } from "react-router-dom";
// Import Components
import Home from "../pages/Home";
import Settings from "../pages/Settings";
import Results from "../pages/Results";
// Export Component_
function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>

      <Route path="/results" element={<Results />}></Route>
      <Route path="/settings"element={<Settings />}
      ></Route>
    </Routes>
  );
}

export default AllRoutes;
