import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "./util/db";
import { randomUUID } from "crypto";
import * as yup from "yup";

export const signInSchema = yup.object({
    email: yup
        .string()
        .email("Invalid email format")
        .required("Email is required"),
    password: yup
        .string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
});

const _authorize = async (
    credentials: Partial<Record<"email" | "password", unknown>>,
) => {
    const validatedCredentials = await signInSchema.validate(credentials, {
        abortEarly: false,
    });

    const { email, password } = validatedCredentials;

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
};

export const { handlers, signIn, signOut, auth } = NextAuth({
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
                try {
                    req; // eslint
                    return _authorize(credentials);
                } catch (ex) {
                    return null;
                }
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
    const session = await auth();
    const { user: sessionUser } = session || {};

    console.log("sessionUser: ", sessionUser);

    const { email } = sessionUser || {};

    if (!email) throw "Could not get logged-in user's id!";

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
