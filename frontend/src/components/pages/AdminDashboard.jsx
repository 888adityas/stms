import React, { useEffect, useState } from "react";
import Header from "../common/Header.jsx";
import Sidebar from "../common/Sidebar.jsx";
import { Routes, Route, Navigate } from "react-router";
import UsersList from "./UsersList.jsx";
import TaskList from "./TaskList.jsx";
import TaskForm from "../forms/TaskForm.jsx";
import EditTask from "./EditTask.jsx";
import AddTask from "./AddTask.jsx";
import AddUser from "./AddUser.jsx";
import { useSelector } from "react-redux";
import { selectUserData } from "../../redux/index.js";

const AdminDashboard = () => {
  const userData = useSelector(selectUserData);
  const [allTasks, setAllTasks] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_ENDPOINT}/api/task/gettask`
        );
        const data = await response.json();
        if (response.ok) {
          console.log("ALL Tasks:", data);
          setAllTasks(data);
        } else {
          console.error("Failed to fetch tasks:");
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    if (userData?._id) {
      fetchTasks();
    }
  }, [userData, reload]);

  const title = (
    <div className="flex flex-col">
      <p className="text-2xl font-bold text-white">
        Welcome {userData?.name || "User"}
      </p>
      <p className="text-sm">Admin Dashboard</p>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Header title={title} />
      <div className="flex flex-1">
        <Sidebar />

        <div className="flex-1 p-4 px-3 md:px-8 lg:px-16 overflow-hidden">
          <div className="w-full overflow-x-auto">
            <div className="min-w-0 max-w-full">
              <Routes>
                <Route
                  path="/"
                  element={<Navigate to="/admin/users" replace />}
                />
                <Route path="/users" element={<UsersList />} />
                <Route path="/add-user" element={<AddUser />} />
                <Route
                  path="/tasks"
                  element={<TaskList tasks={allTasks} setReload={setReload} />}
                />

                <Route
                  path="tasks/:taskId/edit"
                  element={<EditTask setReload={setReload} />}
                />
                <Route
                  path="/add-task"
                  element={<AddTask setReload={setReload} />}
                />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
