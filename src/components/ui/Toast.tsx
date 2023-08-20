import { toast } from "react-toastify";
import { FC } from "react";

interface ToastProps {
  message: string;
  success?: boolean;
  error?: boolean;
}

const Toast: FC<ToastProps> = ({ message, success, error }) => {
  if (error) {
    return toast.error(message, {
      position: "bottom-left",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  } else if (success) {
    return toast.success(message, {
      position: "bottom-left",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  } else {
    return toast.info(message, {
      position: "bottom-left",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  }
};

export default Toast;
