import React, { useState } from "react";
import { useNavigate } from "react-router";
import { PencilIcon, TrashIcon, EyeIcon } from "@heroicons/react/24/outline";
import DataTable from "../common/DataTable";
import Modal from "../common/Modal";
// import { useSelector } from "react-redux";
// import { selectUserData } from "../../redux";
import { notifyError, notifySuccess } from "../../utils/toasts";

const TaskList = ({ tasks, setReload }) => {
  // const userData = useSelector(selectUserData);

  const navigate = useNavigate();
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  //   const [isEditFormOpen, setIsEditFormOpen] = useState(false);

  const handleDelete = async (taskId) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (!confirm) return;

    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_ENDPOINT}/api/task/deletetask/${taskId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();

    if (response.ok) {
      setReload((prev) => !prev);
      notifySuccess("Task deleted successfully");
    } else {
      console.error("Failed to delete task:", data);
      notifyError("Failed to delete task");
    }
  };

  const handleEdit = (taskId) => {
    navigate(`${taskId}/edit`);
  };

  const handleView = (taskId) => {
    const task = tasks.find((t) => t._id === taskId);
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
  };

  // Column definitions for the task table
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
      key: "description",
      header: "Description",
      className: "max-w-xs truncate text-gray-500",
    },
    {
      key: "assign",
      header: "Assigned To",
      className: "text-gray-700",
      render: (task) => {
        const user = task.assign;
        return user ? user.name : "N/A";
      },
    },
    {
      key: "priority",
      header: "Priority",
      render: (task) => (
        <span
          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
            ${
              task.priority === "High"
                ? "bg-red-100 text-red-800"
                : task.priority === "Medium"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-green-100 text-green-800"
            }`}
        >
          {task.priority}
        </span>
      ),
    },
    {
      key: "startdate",
      header: "Start Date",
      className: "text-gray-500",
      render: (task) =>
        new Date(task.startdate).toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }),
    },
    {
      key: "enddate",
      header: "End Date",
      className: "text-gray-500",
      render: (task) =>
        new Date(task.enddate).toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }),
    },
    {
      key: "status",
      header: "Status",
      render: (task) => (
        <span
          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
            ${
              task.status === "Completed"
                ? "bg-green-100 text-green-800"
                : task.status === "InProgress"
                ? "bg-blue-100 text-blue-800"
                : "bg-gray-100 text-gray-800"
            }`}
          // "Pending", "InProgress", "Completed"
        >
          {task.status}
        </span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      align: "right",
      render: (task) => (
        <div className="flex space-x-2 justify-end">
          <button
            className="text-blue-600 hover:text-blue-800 cursor-pointer"
            onClick={() => handleView(task._id)}
            title="View Task"
          >
            <EyeIcon className="h-5 w-5" />
          </button>
          <button
            className="text-green-600 hover:text-green-800 cursor-pointer"
            onClick={() => handleEdit(task._id)}
            title="Edit Task"
          >
            <PencilIcon className="h-5 w-5" />
          </button>
          <button
            className="text-red-600 hover:text-red-800 cursor-pointer"
            onClick={() => handleDelete(task._id)}
            title="Delete Task"
          >
            <TrashIcon className="h-5 w-5" />
          </button>
        </div>
      ),
    },
  ];

  // Render the task details in the modal
  const renderTaskDetails = () => {
    if (!selectedTask) return null;

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-gray-500">Title</p>
            <p className="text-base font-semibold">{selectedTask.title}</p>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-500">Assigned To</p>
            <p className="text-base">{selectedTask.assign?.name}</p>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-500">Status</p>
            <span
              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                ${
                  selectedTask.status === "Completed"
                    ? "bg-green-100 text-green-800"
                    : selectedTask.status === "InProgress"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-gray-100 text-gray-800"
                }`}
            >
              {selectedTask.status}
            </span>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-500">Priority</p>
            <span
              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                ${
                  selectedTask.priority === "High"
                    ? "bg-red-100 text-red-800"
                    : selectedTask.priority === "Medium"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-green-100 text-green-800"
                }`}
            >
              {selectedTask.priority}
            </span>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-500">Start Date</p>
            <p className="text-base">
              {new Date(selectedTask.startdate).toLocaleDateString()}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-500">End Date</p>
            <p className="text-base">
              {new Date(selectedTask.enddate).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="mt-4">
          <p className="text-sm font-medium text-gray-500">Description</p>
          <p className="text-base mt-1 whitespace-pre-line">
            {selectedTask.description}
          </p>
        </div>
      </div>
    );
  };

  return (
    <>
      {tasks && tasks.length > 0 && (
        <>
          <DataTable columns={columns} data={tasks} title="Task Management" />

          <Modal isOpen={isModalOpen} onClose={closeModal} title="Task Details">
            {renderTaskDetails()}
          </Modal>
        </>
      )}
      {
        // Show a message if there are no tasks
        tasks && tasks.length === 0 && (
          <div className="flex items-center justify-center h-96">
            <p className="text-gray-500 text-3xl">No tasks available</p>
          </div>
        )
      }
    </>
  );
};

export default TaskList;
