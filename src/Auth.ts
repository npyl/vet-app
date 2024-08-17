import { randomUUID } from "crypto";
import NextAuth, { getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/util/db";

export const handlers = NextAuth({
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

                const email = credentials?.email as string;
                const password = credentials?.password as string;
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
        // NOTE: called whenever a token is created (signIn) or updated (update from session)
        async jwt({ token, user }) {
            return { ...token, ...user };
        },
        async session({ session, token }) {
            return { ...session, user: token };
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

interface GetProfileOptions {
    workingHours?: boolean;
    workplace?: boolean;
    pets?: boolean;
    appointments?: boolean;
}

export const getProfile = async ({
    workingHours,
    workplace,
    pets,
    appointments,
}: GetProfileOptions) => {
    const session = await getServerSession();
    const { user: sessionUser } = session || {};
    const { email } = sessionUser || {};

    if (!email) throw "Could not logged-in user's id!";

    const user = await prisma.user.findUnique({
        where: {
            email,
        },
        include: {
            workingHours,
            workplace,
            pets,
            appointments,
        },
    });

    return user;
};
