import React from "react";
import { Routes, Route, Navigate } from "react-router";
import AdminDashboard from "./components/pages/AdminDashboard";

function App() {
  return (
    <Routes>
      <Route path="admin/*" element={<AdminDashboard />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
