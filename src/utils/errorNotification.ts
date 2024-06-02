import { toast } from 'react-toastify';

export const errorNotification = (errorMessage: string) => {
  toast.error(errorMessage, {
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    });
};