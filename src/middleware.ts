import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import {
    loadStateAuthLocalStorage,
    saveStateAuthLocalStorage,
} from "./libs/state.localStorage";

interface DecodeJwt {
    id: string;
    role: string;
    iat: number;
    exp: number;
}

export async function middleware(request: NextRequest) {
    const token = request.cookies.get("token");
    try {
        /*
        if (!token)
            return NextResponse.redirect(new URL("/login", request.url));
*/
        //console.log(token);

        //const decodeJwt = jwt.decode(token.value) as DecodeJwt;

        //console.log(decodeJwt);

        //saveStateAuthLocalStorage({ _id: decodeJwt.id, role: decodeJwt.role });

        //const auth = loadStateAuthLocalStorage();

        return NextResponse.next();
    } catch (error) {
        //return NextResponse.redirect(new URL("/login", request.url));
    }
}

export const config = {
    matcher: ["/dashboard/:path*"],
};
