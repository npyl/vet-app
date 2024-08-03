import { randomUUID } from "crypto";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/util/db";

// Define a type that matches NextAuth's User interface
type NextAuthUser = {
    id: string;
    email: string;
    name?: string;
    image?: string;
    // Add other fields as needed
};

const authOptions: AuthOptions = {
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

                const email = credentials?.["email"];
                const password = credentials?.["password"];
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
                const nextAuthUser: NextAuthUser = {
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
        async jwt({ token, user }) {
            return { ...token, ...user };
        },
        async session({ session }) {
            return session;
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
};

export default authOptions;
