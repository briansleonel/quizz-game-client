import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
    const jwt = request.cookies.get("token");

    try {
        if (!jwt) return NextResponse.redirect(new URL("/login", request.url));

        return NextResponse.next();
    } catch (error) {
        return NextResponse.redirect(new URL("/login", request.url));
    }
}

export const config = {
    matcher: ["/dashboard/:path*"],
};
