import {
    CheckCircleFill,
    ExclamationCircleFill,
    ExclamationTriangleFill,
    XCircleFill,
} from "react-bootstrap-icons";
import { toast } from "sonner";

const style = { fontSize: "0.875rem" };

export function toastSuccess(message: string) {
    toast(message, {
        icon: <CheckCircleFill style={{ color: "#22c55e" }} />,
        style,
    });
}

export function toastError(message: string) {
    toast(message, {
        icon: <XCircleFill style={{ color: "#dc2626" }} />,
        style,
    });
}

export function toastWarning(message: string) {
    toast(message, {
        icon: <ExclamationTriangleFill style={{ color: "#facc15" }} />,
        style,
    });
}

export function toastInformation(message: string) {
    toast(message, {
        icon: <ExclamationCircleFill style={{ color: "#2563eb" }} />,
        style,
    });
}
