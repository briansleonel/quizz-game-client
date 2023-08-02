import axios from "axios";

/**
 * Variables de entorno de la aplicación
 */
export const config = {
    //URL_API: process.env.URL_API || "http://192.168.0.12:3001/api/",
    URL_API: process.env.URL_API || "http://localhost:3001/api/",
};

/**
 * Establezco la instancia de axios para poder hacer consultas HTTP
 */
export const __instanceAxios = axios.create({
    baseURL: config.URL_API,
    withCredentials: true,
});

/**
 * Endpoints de la API
 */
export enum endpointsAPI {
    USER = "user",
    LOGIN = "login",
    REGISTER = "register",
    QUESTION = "question",
    CATEGORY = "category",
}
