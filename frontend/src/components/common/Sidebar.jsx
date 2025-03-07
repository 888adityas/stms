import React, { useState } from "react";
import { NavLink } from "react-router";
import {
  UserGroupIcon,
  UserPlusIcon,
  ClipboardDocumentListIcon,
  ClipboardDocumentCheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    {
      path: "/admin/users",
      name: "Users",
      icon: <UserGroupIcon className="w-6 h-6" />,
    },
    {
      path: "/admin/add-user",
      name: "Add User",
      icon: <UserPlusIcon className="w-6 h-6" />,
    },
    {
      path: "/admin/tasks",
      name: "Tasks",
      icon: <ClipboardDocumentListIcon className="w-6 h-6" />,
    },
    {
      path: "/admin/add-task",
      name: "Add Task",
      icon: <ClipboardDocumentCheckIcon className="w-6 h-6" />,
    },
  ];

  return (
    <div
      className={`bg-gray-800 text-white transition-all duration-300 ${
        collapsed ? "w-15 md:w-16" : "w-64"
      }`}
    >
      <div className="p-4 flex justify-end">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-full hover:bg-gray-700 focus:outline-none"
        >
          {collapsed ? (
            <ChevronRightIcon className="w-5 h-5" />
          ) : (
            <ChevronLeftIcon className="w-5 h-5" />
          )}
        </button>
      </div>
      <nav className="mt-5">
        {menuItems.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className={({ isActive }) =>
              `flex items-center p-4  ${
                isActive ? "bg-blue-700" : "hover:bg-gray-700"
              } transition-colors duration-200`
            }
          >
            <div className="mr-4">{item.icon}</div>
            {!collapsed && <span className="ease-in-out">{item.name}</span>}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
