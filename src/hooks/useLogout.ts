import { toastError, toastSuccess } from "@/libs/sonner/sonner.toast";
import { deleteAuthLocalStorage } from "@/libs/state.localStorage";
import { deleteTokenLocalStorage } from "@/libs/token.localStorage";
import userService from "@/services/user.service";
import { logout } from "@/store/features/authSlice";
import { useAppDispatch } from "@/store/hooks.redux";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

/**
 * Hook personalizado que maneja el logout de un usuario en la aplicación.
 * Si todo salió bien, elimina los datos almacenados en local de un usuario.
 * En caso contrario se muestra una notificación del error sucedido.
 * @returns hook para realizar el loggeo de un usuario
 */
export function useLogoutMutation() {
    const dispatch = useAppDispatch();
    const router = useRouter();

    const queryClient = useQueryClient();

    const logoutMutation = useMutation({
        mutationFn: userService.logout,
        onSuccess: (data, variables, context) => {
            try {
                dispatch(logout()); // elimino los datos de la store
                deleteAuthLocalStorage(); // elimino los datos de localstorage
                deleteTokenLocalStorage();
                toastSuccess(data.message);
                router.push("/login"); // redirecciono a la página /dashboard
                //queryCache.clear();
                queryClient.clear();
            } catch (error) {
                if (error instanceof Error) toastError(error.message);
            }
        },
        onError: (err, variables, context) => {
            if (err instanceof Error) toastError(err.message);
        },
    });

    return logoutMutation;
}

export function useLogout() {
    const logoutMutation = useLogoutMutation();

    async function handlerLogout() {
        await logoutMutation.mutateAsync();
    }

    return { handlerLogout };
}
