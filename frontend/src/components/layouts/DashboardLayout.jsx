import React from "react";
import Header from "../common/Header";

const DashboardLayout = ({ children, pageTitle }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header title={pageTitle} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
