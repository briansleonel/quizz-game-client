import userService from "@/services/user.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export default function useDeleteUserMutation() {
    const queryClient = useQueryClient();

    const deleteUserMutation = useMutation({
        mutationFn: userService.deleteUser,
        onSuccess: (data) => {
            console.log(data);
            toast.success("Usuario eliminado");
            // Actualizar los datos después de eliminar un usuario
            queryClient.invalidateQueries({ queryKey: ["users"] });
        },
        onError: (err) => {
            if (err instanceof Error) {
                toast.error(err.message);
            }
        },
    });

    return deleteUserMutation;
}
