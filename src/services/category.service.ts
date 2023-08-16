import { __instanceAxios, endpointsAPI } from "@/config/config";
import { APIResponse } from "@/types/api";
import { IQuestionCategory } from "@/types/questionCategory";
import { isAxiosError } from "axios";

async function getAllCategories() {
    try {
        const response = await __instanceAxios.get(endpointsAPI.CATEGORY);
        console.log(response.data);
        return response.data.data as Array<IQuestionCategory>;
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

async function getAllCategoriesPagination() {
    try {
        const response = await __instanceAxios.get(endpointsAPI.CATEGORY);
        console.log(response.data);
        return response.data as APIResponse<Array<IQuestionCategory>>;
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

async function deleteCategory(id: string) {
    try {
        const response = await __instanceAxios.delete(
            `${endpointsAPI.CATEGORY}/${id}`
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

async function updateCategory(category: IQuestionCategory) {
    try {
        const response = await __instanceAxios.put(
            `${endpointsAPI.CATEGORY}/${category._id}`,
            category
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

async function addCategory(category: IQuestionCategory) {
    try {
        const response = await __instanceAxios.post(endpointsAPI.CATEGORY, {
            name: category.name,
        });
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

const categoryService = {
    getAllCategories,
    deleteCategory,
    updateCategory,
    addCategory,
    getAllCategoriesPagination,
};

export default categoryService;
