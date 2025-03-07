import React from "react";
import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/outline";
import { useDispatch } from "react-redux";
import { logout } from "../../redux";
import { useNavigate } from "react-router";
import { notifySuccess } from "../../utils/toasts";

const Header = ({ title }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    console.log("Logging out...");
    dispatch(logout());
    notifySuccess("Successfully logged out!");
    navigate("/login");
  };

  return (
    <header className="bg-blue-600 shadow-md">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">{title}</h1>
        <button
          className="flex items-center px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-md transition-colors cursor-pointer"
          onClick={handleLogout}
        >
          <ArrowLeftStartOnRectangleIcon className="h-5 w-5 mr-2" />
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
