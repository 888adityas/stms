import React, { useState } from "react";
import UserForm from "../forms/UserForm";
import { notifyError, notifySuccess } from "../../utils/toasts";

const AddUser = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const createUserHandler = async (values) => {
    setIsSubmitting(true);
    const payload = {
      title: values.title.trim(),
      name: values.name.trim(),
      email: values.email.trim(),
      password: values.password.trim(),
      isAdmin: values.isAdmin,
    };
    console.log("Payload:", payload);

    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_ENDPOINT}/api/user/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      console.error("Failed to create user");
      notifyError("Failed to create user");
      setIsSubmitting(false);
      return;
    } else {
      console.log("User created successfully");
      notifySuccess("User created successfully");
    }
  };

  return (
    <div className="">
      <div className="mx-auto">
        <UserForm
          title="Create New User"
          initialValues={{}}
          submitButtonText={isSubmitting ? "Creating..." : "Create User"}
          onSubmit={createUserHandler}
        />
      </div>
    </div>
  );
};

export default AddUser;
