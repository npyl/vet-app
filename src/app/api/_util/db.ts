import { PrismaClient } from "@prisma/client";

let prismaInstance: PrismaClient | undefined;

function prismaClientSingleton(): PrismaClient {
    if (!prismaInstance) {
        prismaInstance = new PrismaClient();
    }
    return prismaInstance;
}

const prisma = prismaClientSingleton();

export default prisma;
