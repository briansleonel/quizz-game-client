import userService from "@/services/user.service";
import { login } from "@/store/features/authSlice";
import { useAppDispatch } from "@/store/hooks.redux";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

/**
 * Hook personalizado que maneja el registro de un nuevo usuario en la aplicación.
 * Realiza una consulta a la api y de acuerdo a la respuesta toma ciertas acciones.
 * Si todo salió bien, se guardan los datos del usuario enviados de de la api en el estado global de la aplicación y se redirecciona a la página principal del usuario.
 * En caso contrario se muetra ina notificación del error sucedido.
 * @returns hook para realizar el regsitro de un usuario y el loggeo
 */
export function useRegisterMutation() {
    const dispatch = useAppDispatch();
    const router = useRouter();

    const registerMutation = useMutation({
        mutationFn: userService.register,
        onSuccess: (data) => {
            console.log(data);
            dispatch(login(data.data));
            toast.success(data.message);
            router.push("/dashboard");
        },
        onError: (err) => {
            if (err instanceof Error)
                err.message.startsWith("E11000")
                    ? toast.error("Nombre de usuario no disponible")
                    : toast.error(err.message);
        },
    });

    return registerMutation;
}
