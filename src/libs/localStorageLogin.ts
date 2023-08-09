"use client";

interface Auth {
    _id: string;
    role: string;
}

export function localStorageUser(user: Auth) {
    localStorage.setItem("auth", JSON.stringify(user));
}

export function getUserAuthStorage() {
    const authString = localStorage.getItem("auth");

    if (authString !== null) {
        const auth: Auth = JSON.parse(authString);
        return auth;
    }
}

export function verifiyAuth() {
    return verifyItemStorage("auth");
}

export function verifyItemStorage(key: string) {
    return localStorage.getItem(key) ? true : false;
}
