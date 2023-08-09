import { toastError, toastSuccess } from "@/libs/toast";
import questionService from "@/services/question.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteQuestionMutation() {
    const queryClient = useQueryClient();

    const deleteQuestionMutation = useMutation({
        mutationFn: questionService.deleteQuestion,
        onSuccess: (data) => {
            console.log(data);
            toastSuccess(data.message);
            // Actualizar los datos después de eliminar un usuario
            queryClient.invalidateQueries({ queryKey: ["questions"] });
        },
        onError: (err) => {
            if (err instanceof Error) {
                toastError(err.message);
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
            toastSuccess(data.message);
            // Actualizar los datos después de eliminar un usuario
            queryClient.invalidateQueries({ queryKey: ["questions"] });
        },
        onError: (err) => {
            if (err instanceof Error) {
                toastError(err.message);
            }
        },
    });

    return changeVerifiedQuestionMutation;
}

export function useUpdateQuestionMutation() {
    const updateQuestionMutation = useMutation({
        mutationFn: questionService.updateQuestion,

        onSuccess: (data) => {
            toastSuccess(data.message as string);
        },
        onError: (err) => {
            if (err instanceof Error) {
                toastError(err.message);
            }
        },
    });

    return updateQuestionMutation;
}

export function useQuestion() {}
