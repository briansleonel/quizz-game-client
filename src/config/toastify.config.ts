import { ToastPosition } from "react-toastify";
import { Theme, ToastProps } from "react-toastify/dist/types";

interface Props {
    position: ToastPosition;
    autoClose: number;
    hideProgressBar: boolean;
    newestOnTop: boolean;
    closeOnClick: boolean;
    rtl: boolean;
    pauseOnFocusLoss: boolean;
    draggable: boolean;
    pauseOnHover: boolean;
    theme: Theme;
}

export const toastifyConfig: Props = {
    position: "top-right",
    autoClose: 8000,
    hideProgressBar: false,
    newestOnTop: false,
    closeOnClick: true,
    rtl: false,
    pauseOnFocusLoss: true,
    draggable: true,
    pauseOnHover: true,
    theme: "dark",
};
