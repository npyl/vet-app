// NOTE: require authentication for all routes except /login and /register

import withAuth, { NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(request: NextRequestWithAuth) {
        if (request.nextUrl.pathname === "/") {
            if (request.nextauth.token) {
                return NextResponse.redirect(new URL("/projects", request.url));
            } else {
                return NextResponse.redirect(new URL("/login", request.url));
            }
        }
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token,
        },
    },
);

export const config = {
    matcher: ["/", "/((?!login|register).*)"],
};
