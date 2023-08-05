import { __instanceAxios, endpointsAPI } from "@/config/config";
import { IQuestionCategory } from "@/types/questionCategory";
import { isAxiosError } from "axios";

export async function getAllCategories() {
    try {
        const res = await __instanceAxios.get(endpointsAPI.CATEGORY);
        return res.data.data as Array<IQuestionCategory>;
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

const categoryService = {
    getAllCategories,
};

export default categoryService;
