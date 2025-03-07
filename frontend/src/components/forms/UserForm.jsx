import React, { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

const UserForm = ({
  title = "User Form",
  initialValues = {},
  submitButtonText = "Submit",
  onSubmit,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    isAdmin: "false",
    password: "",
    title: "",
    ...initialValues,
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("Form submitted with values:", formData);
    onSubmit?.(formData);

    // Clear form inputs
    setFormData({
      name: "",
      email: "",
      isAdmin: "false",
      password: "",
      title: "",
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 pb-4 border border-gray-100">
      <h2 className="text-2xl font-bold text-blue-800 mb-6 pb-2 border-b border-blue-100">
        {title}
      </h2>
      <form onSubmit={handleSubmit} className="animate-fadeIn">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* TITLE */}
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="block text-base font-medium text-gray-700"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="block w-full py-3 px-4 rounded-md border-gray-300 shadow-md focus:border-indigo-500 focus:ring-indigo-500 text-base transition-all duration-300 hover:shadow-lg"
              placeholder="MR., MRS., MS., DR., etc."
              required
            />
          </div>

          {/* Name */}
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="block text-base font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="block w-full py-3 px-4 rounded-md border-gray-300 shadow-md focus:border-indigo-500 focus:ring-indigo-500 text-base transition-all duration-300 hover:shadow-lg"
              placeholder="Enter full name"
              required
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-base font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="block w-full py-3 px-4 rounded-md border-gray-300 shadow-md focus:border-indigo-500 focus:ring-indigo-500 text-base transition-all duration-300 hover:shadow-lg"
              placeholder="Enter email address"
              required
            />
          </div>

          {/* isAdmin */}
          <div className="space-y-2">
            <label
              htmlFor="isAdmin"
              className="block text-base font-medium text-gray-700"
            >
              Admin Access
            </label>
            <select
              id="isAdmin"
              name="isAdmin"
              value={formData.isAdmin}
              onChange={handleChange}
              className="block w-full py-3 px-4 rounded-md border-gray-300 shadow-md focus:border-indigo-500 focus:ring-indigo-500 text-base transition-all duration-300 hover:shadow-lg"
              required
            >
              <option value="false">No</option>
              <option value="true">Yes</option>
            </select>
          </div>

          {/* Password with view toggle */}
          <div className="space-y-2 ">
            <label
              htmlFor="password"
              className="block text-base font-medium text-gray-700"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="block w-full py-3 px-4 rounded-md border-gray-300 shadow-md focus:border-indigo-500 focus:ring-indigo-500 text-base transition-all duration-300 hover:shadow-lg"
                placeholder="Enter password"
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <EyeIcon className="h-5 w-5 text-gray-500" />
                ) : (
                  <EyeSlashIcon className="h-5 w-5 text-gray-500" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-6">
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

export default UserForm;
