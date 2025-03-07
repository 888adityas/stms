import React from "react";
import Header from "../common/Header.jsx";
import Sidebar from "../common/Sidebar.jsx";
import { Outlet } from "react-router";

const AdminLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header title={"Admin Dashboard"} />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
