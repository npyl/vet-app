import { getProfile } from "@/Auth";
import { ProductType } from "@prisma/client";
import prisma from "@/util/db";

const getAlmostOutOfStock = async () => {
    const type = "ALL";

    const user = await getProfile({ workplace: true });
    if (!user) throw "User not found";

    const products = await prisma.product.findMany({
        where: {
            workplaceId: {
                equals: user?.workplace?.id,
            },
            // Filter by type (if different than ALL)
            ...(type === "ALL"
                ? {}
                : {
                      type: {
                          equals: type as ProductType,
                      },
                  }),
        },
    });

    return products;
};

export default getAlmostOutOfStock;
