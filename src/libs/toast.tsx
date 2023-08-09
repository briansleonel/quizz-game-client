import { ExclamationTriangleFill, InfoCircleFill } from "react-bootstrap-icons";
import toast from "react-hot-toast";

export function toastInformation(message: string) {
    toast(message, {
        icon: <InfoCircleFill style={{ color: "#2563eb" }} />,
    });
}

export function toastWarning(message: string) {
    toast(message, {
        icon: "⚠️",
    });
}

export function toastSuccess(message: string) {
    toast.success(message);
}

export function toastError(message: string) {
    toast.error(message);
}
