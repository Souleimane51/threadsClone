import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export function middleware(req) {
    let isAuthenticated = false;

    if (
        cookies().has("guest") ||
        cookies().has("__Secure-next-auth.session-token.1")
    ) {
        isAuthenticated = true;
    }
    if (!isAuthenticated) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: "/",
};
