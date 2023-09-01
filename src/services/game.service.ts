import { __instanceAxios, endpointsAPI } from "@/config/config";
import { IQuestionId } from "@/types/question";
import { isAxiosError } from "axios";

interface GameQuery {
    limit: number;
    category: string;
}

async function getQuestionsGame({ category, limit }: GameQuery) {
    try {
        const response = await __instanceAxios.get(
            `${endpointsAPI.GAME}/${category}/${limit}`
        );
        console.log(response);

        return response.data.data as Array<IQuestionId>;
    } catch (error) {
        // Si el error es una instancia de AxiosError, puedes acceder a la propiedad response
        if (isAxiosError(error)) {
            //Si la respuesta tiene un código de estado, significa que la API respondió con un error HTTP
            if (error.response) {
                // Lanza una excepción con el mensaje de error recibido de la API
                throw new Error(error.response.data.message);
            }
        }
        if (error instanceof Error) throw new Error(error.message);
    }
}

const gameService = {
    getQuestionsGame,
};

export default gameService;
