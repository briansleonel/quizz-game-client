import { isAxiosError } from "axios";
import { __instanceAxios, endpointsAPI } from "@/config/config";
import { ILogin, IUser } from "@/types/user";
import { APIResponse, PaginationFetch } from "@/types/api";
import { Verified } from "@/store/features/filters.slice";

export interface QueryFetch extends PaginationFetch {
    verified: Verified;
    searchText: string;
}

/**
 * Permite realizar validar las credenciales de un usuario e iniciar sesión dentro de la aplicación
 *
 * @param user credenciales de un usuario
 * @returns respuesta del servidor
 */
export async function login(user: ILogin) {
    try {
        const response = await __instanceAxios.post(endpointsAPI.LOGIN, user);

        return response.data;
    } catch (error) {
        // Si el error es una instancia de AxiosError, puedes acceder a la propiedad response
        if (isAxiosError(error)) {
            //Si la respuesta tiene un código de estado, significa que la API respondió con un error HTTP
            if (error.response) {
                // Lanza una excepción con el mensaje de error recibido de la API
                throw new Error(error.response.data.message);
            }
        } else {
            // Si no hay respuesta o no se pudo conectar con la API, lanza una excepción genérica
            throw new Error("Error al verificar las credenciales");
        }
    }
}

async function getUsers({
    limit = 10,
    page = 1,
    verified,
    searchText,
}: QueryFetch) {
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
            endpointsAPI.USER + paginationData + queryData
        );
        console.log(response.data);

        return response.data as APIResponse<Array<IUser>>;
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

async function register(user: IUser) {
    try {
        const response = await __instanceAxios.post(
            endpointsAPI.REGISTER,
            user
        );
        return response.data;
    } catch (error) {
        // Si el error es una instancia de AxiosError, puedes acceder a la propiedad response
        if (isAxiosError(error)) {
            //Si la respuesta tiene un código de estado, significa que la API respondió con un error HTTP
            if (error.response)
                // Lanza una excepción con el mensaje de error recibido de la API
                throw new Error(error.response.data.message);
        }
        // Si no hay respuesta o no se pudo conectar con la API, lanza una excepción genérica
        else throw new Error("Error al registrar un usuario");
    }
}

async function deleteUser(idUser: string) {
    try {
        const response = await __instanceAxios.delete(
            `${endpointsAPI.USER}/${idUser}`
        );
        console.log(response.data);
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

const userService = {
    login,
    register,
    getUsers,
    deleteUser,
};

export default userService;
