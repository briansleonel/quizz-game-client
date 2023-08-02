import questionService from "@/services/question.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export function useDeleteQuestionMutation() {
    const queryClient = useQueryClient();

    const deleteQuestionMutation = useMutation({
        mutationFn: questionService.deleteQuestion,
        onSuccess: (data) => {
            console.log(data);
            toast.success(data.message);
            // Actualizar los datos después de eliminar un usuario
            queryClient.invalidateQueries({ queryKey: ["questions"] });
        },
        onError: (err) => {
            if (err instanceof Error) {
                toast.error(err.message);
            }
        },
    });

    return deleteQuestionMutation;
}

export function useChangeVerificationQuestion() {
    const queryClient = useQueryClient();

    const changeVerifiedQuestionMutation = useMutation({
        mutationFn: questionService.changeVerification,
        onSuccess: (data) => {
            console.log(data);
            toast.success(data.message);
            // Actualizar los datos después de eliminar un usuario
            queryClient.invalidateQueries({ queryKey: ["questions"] });
        },
        onError: (err) => {
            if (err instanceof Error) {
                toast.error(err.message);
            }
        },
    });

    return changeVerifiedQuestionMutation;
}
