import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../redux";
import {
  ClipboardDocumentListIcon,
  CheckCircleIcon,
  EnvelopeIcon,
  LockClosedIcon,
  ArrowRightOnRectangleIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router";
import { notifyError, notifySuccess } from "../../utils/toasts";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [invalidCredentials, setInvalidCredentials] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginHandler = async (e) => {
    e.preventDefault();
    setInvalidCredentials(false);

    const inputData = {
      email: email?.trim(),
      password: password?.trim(),
    };

    const response = await fetch("http://localhost:5000/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputData),
    });

    const data = await response.json();
    // console.log("data:", data);

    if (data?.success) {
      dispatch(login(data?.user));
      notifySuccess("Successfully logged in!");

      if (data.user?.isAdmin) {
        navigate("/admin/users");
      } else {
        navigate("/userdashboard");
      }
    } else {
      notifyError(data?.message);
      setInvalidCredentials(true);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex h-screen">
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-gray-50">
        <div className="w-[80%] max-w-md">
          <form
            className="bg-white p-8 rounded-xl shadow-lg"
            onSubmit={loginHandler}
          >
            <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
              Welcome Back
            </h2>
            <p className="text-gray-600 mb-8 text-center">
              Sign in to access your tasks
            </p>

            <div className="mb-5">
              <label
                className="block text-gray-700 mb-2 font-medium"
                htmlFor="email"
              >
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="mb-5">
              <label
                className="block text-gray-700 mb-2 font-medium"
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockClosedIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className="w-full pl-10 pr-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    className="text-gray-400 hover:text-gray-600 focus:outline-none"
                    onClick={togglePasswordVisibility}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeIcon className="h-5 w-5" />
                    ) : (
                      <EyeSlashIcon className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <a href="#" className="text-blue-600 hover:text-blue-800">
                  Forgot password?
                </a>
              </div>
            </div>

            {invalidCredentials && (
              <p className="text-red-600 text-center">Invalid Credentials</p>
            )}

            <button
              type="submit"
              className="w-full flex justify-center items-center bg-blue-600 text-white p-3 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all"
            >
              <ArrowRightOnRectangleIcon className="h-5 w-5 mr-2" />
              Sign In
            </button>

            <p className="mt-6 text-center text-gray-600">
              Don't have an account?{" "}
              <a
                href="#"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Sign up
              </a>
            </p>
          </form>
        </div>
      </div>

      <div className="hidden lg:flex w-1/2 items-center justify-center bg-gradient-to-br from-blue-50 to-blue-200">
        <div className="w-[80%] text-center">
          <div className="flex flex-col items-center">
            <ClipboardDocumentListIcon className="h-24 w-24 text-blue-600 mb-6" />
            <h1 className="font-mono text-gray-800 text-4xl font-bold mb-4">
              Task Management System
            </h1>
            <p className="text-gray-600 text-xl mb-6">
              Organize, prioritize, and complete your tasks efficiently
            </p>
            <div className="flex items-center gap-2 text-blue-700">
              <CheckCircleIcon className="h-5 w-5" />
              <span>Simple task management</span>
            </div>
            <div className="flex items-center gap-2 text-blue-700 mt-2">
              <CheckCircleIcon className="h-5 w-5" />
              <span>Track your progress</span>
            </div>
            <div className="flex items-center gap-2 text-blue-700 mt-2">
              <CheckCircleIcon className="h-5 w-5" />
              <span>Boost your productivity</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
