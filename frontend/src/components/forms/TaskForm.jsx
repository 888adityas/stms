import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUserData } from "../../redux";

const TaskForm = ({
  title = "Task Form",
  initialValues = {},
  submitButtonText = "Submit",
  onSubmit,
  users = [],
}) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    assign: "",
    priority: "Medium",
    status: "Pending",
    startdate: "",
    enddate: "",
    ...initialValues,
  });

  const userData = useSelector(selectUserData);

  useEffect(() => {
    if (Object.keys(initialValues).length > 0) {
      setFormData({ ...formData, ...initialValues });
    }
  }, [initialValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData({ ...formData, assign: formData?.assign });
    onSubmit?.(formData);
    // clear the input assigned to
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 pb-4 border border-gray-100">
      <h2 className="text-2xl font-bold text-blue-800 mb-6 pb-2 border-b border-blue-100">
        {title}
      </h2>
      <form onSubmit={handleSubmit} className="animate-fadeIn">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Title */}
          <div className="space-y-2">
            <label
              htmlFor="title"
              className="block text-base font-medium text-gray-700"
            >
              Task Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="block w-full py-3 px-4 rounded-md border-gray-300 shadow-md focus:border-indigo-500 focus:ring-indigo-500 text-base transition-all duration-300 hover:shadow-lg"
              placeholder="Enter task title"
              required
            />
          </div>

          {/* Status */}
          <div className="space-y-2">
            <label
              htmlFor="status"
              className="block text-base font-medium text-gray-700"
            >
              Status
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="block w-full py-3 px-4 rounded-md border-gray-300 shadow-md focus:border-indigo-500 focus:ring-indigo-500 text-base transition-all duration-300 hover:shadow-lg"
              required
            >
              <option value="Pending">Pending</option>
              <option value="InProgress">InProgress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          {/* Assigned To */}
          {userData?.isAdmin && (
            <div className="space-y-2">
              <label
                htmlFor="assign"
                className="block text-base font-medium text-gray-700"
              >
                Assigned To
              </label>
              <select
                id="assign"
                name="assign"
                value={formData.assign?._id}
                onChange={handleChange}
                className="block w-full py-3 px-4 rounded-md border-gray-300 shadow-md focus:border-indigo-500 focus:ring-indigo-500 text-base transition-all duration-300 hover:shadow-lg"
                required
              >
                <option value="">Select User</option>
                {users.length > 0 ? (
                  users?.map((user) => (
                    <option key={user._id} value={user._id}>
                      {user.name}
                    </option>
                  ))
                ) : (
                  <>
                    <option value="1">John Doe</option>
                    <option value="2">Jane Smith</option>
                    <option value="3">Michael Brown</option>
                    <option value="4">Emily Davis</option>
                  </>
                )}
              </select>
            </div>
          )}

          {/* Priority */}
          <div className="space-y-2">
            <label
              htmlFor="priority"
              className="block text-base font-medium text-gray-700"
            >
              Priority
            </label>
            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="block w-full py-3 px-4 rounded-md border-gray-300 shadow-md focus:border-indigo-500 focus:ring-indigo-500 text-base transition-all duration-300 hover:shadow-lg"
              required
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          {/* Start Date */}
          <div className="space-y-2">
            <label
              htmlFor="startdate"
              className="block text-base font-medium text-gray-700"
            >
              Start Date
            </label>
            <input
              type="date"
              id="startdate"
              name="startdate"
              value={formData.startdate}
              onChange={handleChange}
              className="block w-full py-3 px-4 rounded-md border-gray-300 shadow-md focus:border-indigo-500 focus:ring-indigo-500 text-base transition-all duration-300 hover:shadow-lg"
              required
            />
          </div>

          {/* End Date */}
          <div className="space-y-2">
            <label
              htmlFor="enddate"
              className="block text-base font-medium text-gray-700"
            >
              End Date
            </label>
            <input
              type="date"
              id="enddate"
              name="enddate"
              value={formData.enddate}
              onChange={handleChange}
              className="block w-full py-3 px-4 rounded-md border-gray-300 shadow-md focus:border-indigo-500 focus:ring-indigo-500 text-base transition-all duration-300 hover:shadow-lg"
              required
            />
          </div>

          {/* Description - Full Width */}
          <div className="space-y-2 lg:col-span-2">
            <label
              htmlFor="description"
              className="block text-base font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={1}
              value={formData.description}
              onChange={handleChange}
              className="block w-full py-3 px-4 rounded-md border-gray-300 shadow-md focus:border-indigo-500 focus:ring-indigo-500 text-base transition-all duration-300 hover:shadow-lg"
              placeholder="Enter task description"
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-3 ">
          <div className="flex justify-end">
            <button
              title={submitButtonText}
              type="submit"
              className="cursor-pointer inline-flex items-center justify-center py-3 px-8 border border-transparent shadow-md text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 hover:shadow-lg"
            >
              {submitButtonText}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
