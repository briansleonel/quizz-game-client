import { toastError, toastSuccess } from "@/libs/sonner/sonner.toast";
import { saveStateAuthLocalStorage } from "@/libs/state.localStorage";
import userService from "@/services/user.service";
import { login } from "@/store/features/authSlice";
import { resetQuestionFilters } from "@/store/features/filters.question.slice";
import { useAppDispatch } from "@/store/hooks.redux";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

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
        onSuccess: (data, variables, context) => {
            try {
                dispatch(resetQuestionFilters()); // reseteo los filtros de búsqueda
                saveStateAuthLocalStorage(data.data);
                dispatch(login(data.data)); // guardo los datos de login en el estado global de la aplicación
                toastSuccess(data.message);
                router.push("/dashboard"); // redirecciono a la página /dashboard
            } catch (error) {
                if (error instanceof Error) toastError(error.message);
            }
        },
        onError: (err, variables, context) => {
            if (err instanceof Error) toastError(err.message);
        },
    });

    return loginMutation;
}
