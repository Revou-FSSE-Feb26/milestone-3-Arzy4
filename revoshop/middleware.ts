import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    const token = request.cookies.get("token")?.value;
    const path = request.nextUrl.pathname;

    if (path.startsWith("/cart") && !token) {
        const loginUrl = new URL("/login", request.url);
        loginUrl.searchParams.set("redirect", path);

        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/cart/:path*"],
};