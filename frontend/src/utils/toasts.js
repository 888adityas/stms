import toast from "react-hot-toast";

export const notifySuccess = (message) => {
  toast.success(message, {
    duration: 4000,
    position: "bottom-right",
  });
};

export const notifyError = (message) => {
  toast.error(message, {
    duration: 4000,
    position: "bottom-right",
  });
};
