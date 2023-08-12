//import {fromJS} from 'immutable'
interface Auth {
    _id: string;
    role: string;
}

const keyAuth = "auth";

/**
 * Permite buscar un item en la localStorage, con los datos de autenticación de un usuario.
 * Si se encuentra el item con la key "auth" se devuelve el item encontrado, en caso contrario se devuelve undefined
 *
 * @returns undefined si no se encontró el item "auth", en caso contrario se devuelve el item
 */
export const loadStateAuthLocalStorage = () => {
    try {
        const serializedData = localStorage.getItem(keyAuth);
        if (serializedData === null) {
            return undefined; // Si no existe el state en el local storage devolvemos undefined para que cargue el state inicial que hayamos definido
        }
        return JSON.parse(serializedData) as Auth; // Si encontramos con exito nuestro storage lo devolvemos.
    } catch (error) {
        return undefined; // Si ocurre algun error, devuelvo undefined para cargar el state inicial.
    }
};

/**
 * Permite guardar en la localStorage los datos de autenticación de un usuario que se logguea en el sistema
 * @param auth datos de un usuario
 */
export const saveStateAuthLocalStorage = (auth: Auth) => {
    try {
        let serializedData = JSON.stringify(auth);
        localStorage.setItem(keyAuth, serializedData);
    } catch (error) {
        console.log(error);
    }
};

/**
 * Permite eliminar los datos de autenticación guardados en localStorage
 */
export const deleteAuthLocalStorage = () => {
    try {
        localStorage.removeItem(keyAuth);
    } catch (error) {
        console.log(error);
    }
};

/*
export function verifiyAuth() {
    return verifyItemStorage("auth");
}

export function verifyItemStorage(key: string) {
    return localStorage.getItem(key) ? true : false;
}
*/
