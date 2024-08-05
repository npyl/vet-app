import Grid from "@mui/material/Grid";
import AppointmentsList from "@/components/Appointments";
import AlmostOutOfStock from "./AlmostOutOf";
import { SectionHeader } from "@/components/Section";
import { getProfile } from "@/Auth";
import { ProductType } from "@prisma/client";
import prisma from "@/util/db";
import { Suspense } from "react";
import DataGridSkeleton from "@/components/DataGrid/Skeleton";

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

const VetDashboard = async () => {
    const almostOutOfStock = getAlmostOutOfStock();

    return (
        <Grid container spacing={5}>
            <Grid item xs={12} lg={6} gap={1}>
                <SectionHeader
                    title="Today's Appointments"
                    icon=""
                    color="primary"
                    borderRadius="10px 10px 0 0"
                />

                <AppointmentsList variant="VET" />
            </Grid>
            <Grid item xs={12} lg={6}>
                <SectionHeader
                    title="Almost out of stock"
                    icon=""
                    color="warning"
                    borderRadius="10px 10px 0 0"
                />

                <Suspense fallback={<DataGridSkeleton />}>
                    <AlmostOutOfStock data={almostOutOfStock} />
                </Suspense>
            </Grid>
        </Grid>
    );
};

export default VetDashboard;
