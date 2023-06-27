import axios from "axios";
import { __instanceAxios, config, endpointsAPI } from "@/config/config";
import { ILogin } from "@/types/user";

/**
 * Permite realizar validar las credenciales de un usuario e iniciar sesión dentro de la aplicación
 *
 * @param user credenciales de un usuario
 * @returns respuesta del servidor
 */
export async function loginRequest(user: ILogin) {
    try {
        const response = await __instanceAxios.post(endpointsAPI.LOGIN, user);

        return response.data;
    } catch (error) {
        // Si el error es una instancia de AxiosError, puedes acceder a la propiedad response
        if (axios.isAxiosError(error)) {
            //Si la respuesta tiene un código de estado, significa que la API respondió con un error HTTP
            if (error.response) {
            }
            // Lanza una excepción con el mensaje de error recibido de la API
            throw new Error(error.response?.data.message);
        } else {
            // Si no hay respuesta o no se pudo conectar con la API, lanza una excepción genérica
            throw new Error("Error al verificar las credenciales");
        }
    }
}

export async function getUsers() {
    try {
        const response = await __instanceAxios.get(endpointsAPI.USER);

        return response.data;
    } catch (error) {
        // Si el error es una instancia de AxiosError, puedes acceder a la propiedad response
        if (axios.isAxiosError(error)) {
            //Si la respuesta tiene un código de estado, significa que la API respondió con un error HTTP
            if (error.response) {
            }
            // Lanza una excepción con el mensaje de error recibido de la API
            throw new Error(error.response?.data.message);
        } else {
            // Si no hay respuesta o no se pudo conectar con la API, lanza una excepción genérica
            throw new Error("Error al verificar las credenciales");
        }
    }
    fetch(config.URL_API + "/user", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        credentials: "include",
        //mode: "no-cors",
    })
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
}
