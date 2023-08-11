import { toastError, toastSuccess } from "@/libs/sonner/sonner.toast";
import userService from "@/services/user.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteUserMutation() {
    const queryClient = useQueryClient();

    const deleteUserMutation = useMutation({
        mutationFn: userService.deleteUser,
        onSuccess: (data) => {
            console.log(data);
            toastSuccess(data.message);
            // Actualizar los datos después de eliminar un usuario
            queryClient.invalidateQueries({ queryKey: ["users"] });
        },
        onError: (err) => {
            if (err instanceof Error) {
                toastError(err.message);
            }
        },
    });

    return deleteUserMutation;
}

export function useChangeVerificationUser() {
    const queryClient = useQueryClient();

    const changeVerifiedUserMutation = useMutation({
        mutationFn: userService.changeVerification,
        onSuccess: (data) => {
            console.log(data);
            toastSuccess(data.message);
            // Actualizar los datos después de eliminar un usuario
            queryClient.invalidateQueries({ queryKey: ["users"] });
        },
        onError: (err) => {
            if (err instanceof Error) {
                toastError(err.message);
            }
        },
    });

    return changeVerifiedUserMutation;
}
