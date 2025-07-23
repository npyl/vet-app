"use server";

import { signIn } from "@/Auth";
import { IRegisterReq } from "@/types/auth";
import prisma from "@/util/db";
import { randomUUID } from "crypto";

const _register = async (b: IRegisterReq) => {
    const {
        workingHours: workingHoursWithVetId,
        region,
        city,
        complex,
        telephone,
        afm,
        ...body
    } = b;

    const {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        vetId,
        ...workingHours
    } = workingHoursWithVetId || {};

    const user = await prisma.user.create({
        data: {
            ...body,

            // --- VET SPECIFIC ---
            ...(body.type === "VET" && workingHours
                ? {
                      // create-assign workingHours
                      workingHours: {
                          create: workingHours,
                      },
                      // create-assign Workplace
                      workplace: {
                          create: {
                              region: region || "",
                              city: city || "",
                              complex: complex || "",
                              telephone: telephone || "",
                              afm: afm || "",
                          },
                      },
                  }
                : {}),
        },
    });

    if (!user) {
        throw {
            errorMessage: `Could not create ${body.type === "VET" ? "vet" : "user"}!`,
        };
    }

    // Randomly generated token
    const token = randomUUID();

    // Update user token
    const res0 = await prisma.user.update({
        where: {
            id: user.id,
        },
        data: {
            token,
        },
    });

    if (!res0) {
        throw { errorMessage: `Could not set jwt token for this user.` };
    }
};

const register = async (b: IRegisterReq) => {
    try {
        await _register(b);
    } catch (ex) {
        console.log(ex);
        return false;
    }

    await signIn("credentials", {
        email: b.email,
        password: b.password,
        redirect: true,
        redirectTo: "/",
    });

    return true;
};

export default register;
