import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { Toaster } from "react-hot-toast";
import Login from "./components/pages/Login.jsx";
import EmployeeDashboard from "./components/pages/EmployeeDashboard.jsx";
import AdminDashboard from "./components/pages/AdminDashboard.jsx";
import Layout from "./components/layouts/Layout.jsx";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="*" element={<App />} />
          <Route path="login" element={<Login />} />
          <Route path="userdashboard/*" element={<EmployeeDashboard />} />
          <Route
            path="userdashboard"
            element={<Navigate to="/userdashboard/tasks" />}
          />

          <Route path="admin/*" element={<AdminDashboard />} />
        </Routes>
        <Toaster />
      </Layout>
    </BrowserRouter>
  </Provider>
);
