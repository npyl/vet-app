// NOTE: require authentication for all routes except /login and /register

import withAuth from "next-auth/middleware";

export default withAuth({
    callbacks: {
        authorized: ({ token }) => !!token,
    },
});

export const config = {
    matcher: [
        "/((?!login|register|api|_next/static|_next/image|favicon.ico).*)",
    ],
};
