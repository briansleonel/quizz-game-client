import { __instanceAxios, endpointsAPI } from "@/config/config";
import { Verified } from "@/store/features/filters.slice";
import { APIResponse, PaginationFetch } from "@/types/api";
import { IQuestion } from "@/types/question";
import { isAxiosError } from "axios";

export interface QueryFetch extends PaginationFetch {
    verified: Verified;
    searchText: string;
}

async function getQuestions({ limit, page, verified, searchText }: QueryFetch) {
    // verifico si se debe mostrar los datos verificados
    const verifiedTransform =
        verified === Verified.ALL
            ? ""
            : verified === Verified.VERIFIED
            ? "true"
            : "false";

    const paginationData = `?page=${page}&limit=${limit}`;
    const queryData = `&verified=${verifiedTransform}&text=${searchText}`;

    try {
        const response = await __instanceAxios.get(
            endpointsAPI.QUESTION + paginationData + queryData
        );
        return response.data as APIResponse<Array<IQuestion>>;
    } catch (error) {
        // Si el error es una instancia de AxiosError, puedes acceder a la propiedad response
        if (isAxiosError(error)) {
            //Si la respuesta tiene un código de estado, significa que la API respondió con un error HTTP
            if (error.response) {
                // Lanza una excepción con el mensaje de error recibido de la API
                throw new Error(error.response.data.message);
            } else {
                throw new Error(error.message);
            }
        } else {
            // Si no hay respuesta o no se pudo conectar con la API, lanza una excepción genérica
            throw new Error("Error sin procesar");
        }
    }
}

async function deleteQuestion(id: string) {
    try {
        const response = await __instanceAxios.delete(
            `${endpointsAPI.QUESTION}/${id}`
        );
        return response.data;
    } catch (error) {
        // Si el error es una instancia de AxiosError, puedes acceder a la propiedad response
        if (isAxiosError(error)) {
            //Si la respuesta tiene un código de estado, significa que la API respondió con un error HTTP
            if (error.response) {
                // Lanza una excepción con el mensaje de error recibido de la API
                throw new Error(error.response.data.message);
            } else {
                throw new Error(error.message);
            }
        } else {
            // Si no hay respuesta o no se pudo conectar con la API, lanza una excepción genérica
            throw new Error("Error sin procesar");
        }
    }
}

async function changeVerification(id: string) {
    try {
        const response = await __instanceAxios.put(
            `${endpointsAPI.QUESTION}/verified/${id}`
        );
        return response.data;
    } catch (error) {
        // Si el error es una instancia de AxiosError, puedes acceder a la propiedad response
        if (isAxiosError(error)) {
            //Si la respuesta tiene un código de estado, significa que la API respondió con un error HTTP
            if (error.response) {
                // Lanza una excepción con el mensaje de error recibido de la API
                throw new Error(error.response.data.message);
            } else {
                throw new Error(error.message);
            }
        } else {
            // Si no hay respuesta o no se pudo conectar con la API, lanza una excepción genérica
            throw new Error("Error sin procesar");
        }
    }
}

async function getQuestion(id: string) {
    try {
        const response = await __instanceAxios.get(
            `${endpointsAPI.QUESTION}/${id}`
        );
        console.log(response.data);
        
        return response.data as APIResponse<IQuestion>;
    } catch (error) {
        // Si el error es una instancia de AxiosError, puedes acceder a la propiedad response
        if (isAxiosError(error)) {
            //Si la respuesta tiene un código de estado, significa que la API respondió con un error HTTP
            if (error.response) {
                // Lanza una excepción con el mensaje de error recibido de la API
                throw new Error(error.response.data.message);
            } else {
                throw new Error(error.message);
            }
        } else {
            // Si no hay respuesta o no se pudo conectar con la API, lanza una excepción genérica
            throw new Error("Error sin procesar");
        }
    }
}

const questionService = {
    getQuestions,
    deleteQuestion,
    changeVerification,
    getQuestion,
};

export default questionService;
