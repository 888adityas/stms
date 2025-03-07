import React, { useEffect, useState } from "react";
import { TrashIcon } from "@heroicons/react/24/outline";
import DataTable from "../common/DataTable";
import { notifyError, notifySuccess } from "../../utils/toasts";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_ENDPOINT}/api/user/getuser`
        );
        const data = await response.json();
        if (response.ok) {
          console.log("All Users:", data);
          setUsers(data);
        } else {
          console.error("Failed to fetch users");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchAllUsers();
  }, [reload]);

  const handleDelete = async (userId) => {
    console.log("Delete user with ID:", userId);

    const confirm = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirm) return;

    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_ENDPOINT}/api/user/deleteuser/${userId}`,
      {
        method: "DELETE",
      }
    );

    if (response.ok) {
      console.log("User deleted successfully");
      notifySuccess("User deleted successfully");
      setReload((prev) => !prev);
      // Refetch users
    } else {
      console.error("Failed to delete user");
      notifyError("Failed to delete user");
    }
  };

  const columns = [
    {
      key: "index",
      header: "S.No",
      render: (_, __, pagination) => pagination.globalIndex + 1,
    },
    {
      key: "title",
      header: "Title",
      className: "font-medium text-gray-900",
    },
    {
      key: "name",
      header: "Name",
      className: "font-medium text-gray-900",
    },
    {
      key: "email",
      header: "Email",
      className: "text-gray-500",
    },
    {
      key: "isAdmin",
      header: "Is Admin",
      render: (user) => (
        <span
          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
            ${
              user.isAdmin
                ? "bg-green-100 text-green-800"
                : "bg-gray-100 text-gray-800"
            }`}
        >
          {user.isAdmin ? "Yes" : "No"}
        </span>
      ),
    },
    {
      key: "tasks",
      header: "Assigned Tasks",
      render: (user) => (
        <span className="text-blue-600">{user?.tasks?.length || 0}</span>
      ),
    },

    {
      key: "actions",
      header: "Actions",
      align: "right",
      render: (user) => {
        if (user?.tasks?.length > 0 || user.isAdmin) {
          return (
            <button
              className="text-red-600 hover:text-red-800 cursor-not-allowed opacity-25"
              onClick={() => handleDelete(user._id)}
            >
              <TrashIcon className="h-5 w-5" />
            </button>
          );
        } else {
          return (
            <button
              className="text-red-600 hover:text-red-800 cursor-pointer"
              onClick={() => handleDelete(user._id)}
            >
              <TrashIcon className="h-5 w-5" />
            </button>
          );
        }
      },
    },
  ];

  return <DataTable columns={columns} data={users} title="Users List" />;
};

export default UsersList;
