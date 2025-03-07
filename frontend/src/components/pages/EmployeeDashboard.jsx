import React, { useEffect, useState } from "react";
import { PencilIcon } from "@heroicons/react/24/outline";
import DataTable from "../common/DataTable";
import DashboardLayout from "../layouts/DashboardLayout";
import { useSelector } from "react-redux";
import { selectUserData } from "../../redux";
import { Route, Routes } from "react-router";
import EditTask from "./EditTask";
import TaskList from "./TaskList";

const EmployeeDashboard = () => {
  const userData = useSelector(selectUserData);
  // console.log("userData:", userData);
  const [tasks, setTasks] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_ENDPOINT}/api/task/getemployeetask/${
            userData?._id
          }`
        );
        const data = await response.json();
        if (response.ok) {
          console.log("User ALL Tasks:", data);
          setTasks(data);
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
      <p className="text-sm">Employee Dashboard</p>
    </div>
  );

  return (
    <>
      <DashboardLayout pageTitle={title}>
        <Routes>
          <Route
            path="tasks"
            // element={
            //   <DataTable columns={columns} data={tasks} title="My Tasks" />
            // }
            element={<TaskList tasks={tasks} setReload={setReload} />}
          />
          <Route
            path="tasks/:taskId/edit"
            element={<EditTask setReload={setReload} />}
          />
        </Routes>
      </DashboardLayout>
    </>
  );
};

export default EmployeeDashboard;
