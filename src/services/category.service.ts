import { __instanceAxios, endpointsAPI } from "@/config/config";
import { APIResponse, PaginationFetch } from "@/types/api";
import { IQuestionCategory } from "@/types/questionCategory";
import { isAxiosError } from "axios";

/**
 * Permite envíar una petición GET a "/api/category/all" para devolver todas las categorías almacenadas en la API, sin paginación de datos
 *
 * @returns todas las categorias
 */
async function getAllCategories() {
    try {
        const response = await __instanceAxios.get(
            `all/${endpointsAPI.CATEGORY}`
        );
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

/**
 * Permite envíar una petición GET a "/api/category" para devolver todas las categorías de la API, a través de la paginación de los datos.
 * Debe enviarse:
 *      * limit: cantidad de datos a mostrar por página
 *      * page: página de datos a mostrar
 *
 * @param PaginationFetch datos de paginación "limit" - "page"
 * @returns
 */
async function getAllCategoriesPagination({ limit, page }: PaginationFetch) {
    const paginationData = `?page=${page}&limit=${limit}`;
    try {
        const response = await __instanceAxios.get(
            endpointsAPI.CATEGORY + paginationData
        );
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

/**
 * Permite envíar una petición DELETE a "/api/category/:id" para eliminar una determinada categoría, a partir de un "id" recibido como parámetro
 *
 * @param id identificador de categoría
 * @returns response de la API
 */
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

/**
 * Permite envíar una petición PUT a "/api/category/:id" para actualizar una determinada categoría. Este método debe recibir como parámetro una catergoría con un ID válido para poder realizar los cambios
 * @param category categoría a actualizar
 * @returns response de la API
 */
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

/**
 * Permite envíar una petición POST a "/api/category" para poder agregar una nueva categoría a la BD. Debe recibir como parámetro los datos de la categoría a agregar.
 * @param category categoría nueva
 * @returns response de la API
 */
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
