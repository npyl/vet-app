import prisma from "@/util/db";
import { auth } from "./auth";

interface GetProfileOptions {
    workingHours?: boolean;
    workplace?: boolean;
    pets?: boolean;
    appointments?: boolean;
}

const _getProfile = async (include: GetProfileOptions) => {
    const session = await auth();
    const { user: sessionUser } = session || {};

    console.log("sessionUser: ", sessionUser);

    const { email } = sessionUser || {};

    if (!email) throw "Could not get logged-in user's id!";

    const user = await prisma.user.findUnique({
        where: {
            email,
        },
        include,
    });

    return user;
};

export const getProfile = async (o: GetProfileOptions) => {
    try {
        return await _getProfile(o);
    } catch (ex) {
        return null;
    }
};
