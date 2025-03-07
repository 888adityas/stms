import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import TaskForm from "../forms/TaskForm";
import { notifySuccess } from "../../utils/toasts";

const EditTask = ({ setReload }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [task, setTask] = useState(null);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { taskId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTask = async () => {
      console.log("fetchTask: id :", taskId);

      const response = await fetch(
        `${
          import.meta.env.VITE_BACKEND_ENDPOINT
        }/api/task/gettaskbyid/${taskId}`
      );

      const data = await response.json();
      console.log("data:", data);
      if (response.ok) {
        setTask(data);
        setIsLoading(false);
      } else {
        setError("Failed to fetch task");
        setIsLoading(false);
      }
    };

    const fetchAllUsers = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_ENDPOINT}/api/user/getuser`
      );
      const data = await response.json();
      console.log("All Users:", data);
      if (response.ok) {
        setUsers(data);
      } else {
        setError("Failed to fetch users");
      }
    };

    if (taskId) {
      fetchTask();
      fetchAllUsers();
    }
  }, [taskId]);

  const handleSubmit = async (formData) => {
    setIsSubmitting(true);
    // Simulate API call
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_ENDPOINT}/api/task/updatetask/${taskId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    const data = await response.json();
    console.log("data:", data);
    setIsSubmitting(false);
    notifySuccess("Task updated successfully");
    navigate(-1);
    setReload((prev) => !prev);
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="space-y-6">
      {/* Go back button */}
      <div className="flex items-center mb-4">
        <button
          onClick={handleCancel}
          className="inline-flex items-center px-3 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          title="Back to Tasks"
          aria-label="Go back to tasks list"
        >
          <ArrowLeftIcon className="h-5 w-5 cursor-pointer" />
        </button>
        <h2 className="ml-3 text-xl font-semibold text-gray-800">
          Task #{taskId}
        </h2>
      </div>

      <div className="mx-auto">
        {isLoading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="text-red-500 text-center p-4">{error}</div>
        ) : (
          <TaskForm
            title="Edit Task"
            initialValues={task}
            submitButtonText={isSubmitting ? "Saving..." : "Update Task"}
            onSubmit={handleSubmit}
            users={users}
          />
        )}
      </div>
    </div>
  );
};

export default EditTask;
