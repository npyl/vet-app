import { randomUUID } from "crypto";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/util/db";

export const { auth, handlers, signIn, signOut } = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {
                    label: "email",
                    type: "text",
                },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {
                req; // eslint

                const email = credentials.email as string;
                const password = credentials.password as string;
                if (!email || !password) return null;

                const user = await prisma.user.findUnique({
                    where: {
                        email,
                        AND: {
                            password: {
                                equals: password,
                            },
                        },
                    },
                });

                if (!user) return null;

                // Generate token
                const token = randomUUID();

                // Update user token
                await prisma.user.update({
                    where: {
                        id: user.id,
                    },
                    data: {
                        token,
                    },
                });

                // Convert to NextAuthUser
                const nextAuthUser = {
                    id: user.id.toString(), // Convert id to string
                    email: user.email,
                    name: `${user.firstName} ${user.lastName}`,
                    image: user.avatar || "",
                };

                return { ...user, ...nextAuthUser, token };
            },
        }),
    ],
    callbacks: {
        authorized: async ({ auth }) => {
            // Logged in users are authenticated, otherwise redirect to login page
            return !!auth;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/login",
        newUser: "/register",
    },
    session: {
        strategy: "jwt",
    },
});
