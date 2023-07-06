import userService from "@/services/user.service";
import { login } from "@/store/features/authSlice";
import { useAppDispatch } from "@/store/hooks.redux";
import { APIResponse } from "@/types/api";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

/**
 * Hook personalizado que maneja el loggeo de un usuario en la aplicación.
 * Realiza una consulta a la api y de acuerdo a la respuesta toma ciertas acciones.
 * Si todo salió bien, se guardan los datos del usuario enviados de sde la api en el estado global de la aplicación y se redirecciona a la página principal del usuario.
 * En caso contrario se muetra ina notificación del error sucedido.
 * @returns hook para realizar el loggeo de un usuario
 */
export function useLoginMutation() {
    const dispatch = useAppDispatch();
    const router = useRouter();

    const loginMutation = useMutation({
        mutationFn: userService.login,
        onSuccess: (data: APIResponse, variables, context) => {
            dispatch(login(data.data)); // guardo los datos de login en el estado global de la aplicación
            toast.success(data.message); // muestro el mensaje recibido
            router.push("/dashboard"); // redirecciono a la página /dashboard
        },
        onError: (err, variables, context) => {
            if (err instanceof Error) toast.error(err.message);
        },
    });

    return loginMutation;
}
