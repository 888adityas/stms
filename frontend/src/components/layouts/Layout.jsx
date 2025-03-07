import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUserData } from "../../redux";
import { useNavigate } from "react-router";

const Layout = ({ children }) => {
  console.log("<- Layout.jsx ->");
  const navigate = useNavigate();
  const pathname = window.location.pathname;
  console.log("pathname:", pathname);

  const userData = useSelector(selectUserData);

  console.log("userData:", userData);

  useEffect(() => {
    // performing redirections
    if (userData && userData?.isAdmin && pathname.includes("userdashboard")) {
      navigate("/admin/tasks");
    }
    if (userData && !userData?.isAdmin && pathname.includes("admin")) {
      navigate("/userdashboard/tasks");
    }
  }, []);

  return <>{children}</>;
};

export default Layout;
