import React, { useEffect, useState } from "react";
import TaskForm from "../forms/TaskForm";
import { notifyError, notifySuccess } from "../../utils/toasts";

const AddTask = ({ setReload }) => {
  const [users, setUsers] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchAllUsers = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_ENDPOINT}/api/user/getuser`
      );
      const data = await response.json();
      console.log("All Users:", data);
      if (response.ok) {
        setUsers(data);
      } else {
        console.error(data);
      }
    };

    fetchAllUsers();
  }, []);

  // Set default initial values for a new task
  const initialValues = {
    title: "",
    description: "",
    status: "Pending",
    priority: "Medium",
    startdate: "",
    enddate: "",
  };

  const handleSubmit = async (values) => {
    setIsSubmitting(true);

    console.log("formData:", values);
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_ENDPOINT}/api/task/settask`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }
    );

    if (response.ok) {
      console.log("Task created successfully");
      notifySuccess("Task created successfully");
      setReload((prev) => !prev);
    } else {
      console.error("Failed to create task");
      notifyError("Failed to create task");
    }
    setIsSubmitting(false);
  };

  return (
    <div className="">
      <div className="mx-auto">
        <TaskForm
          title="Create New Task"
          initialValues={initialValues}
          submitButtonText={isSubmitting ? "Creating..." : "Create Task"}
          onSubmit={handleSubmit}
          users={users}
        />
      </div>
    </div>
  );
};

export default AddTask;
