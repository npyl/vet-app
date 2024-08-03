import NextAuth from "next-auth";
import authConfig from "@/constants/authOptions";

export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
});
