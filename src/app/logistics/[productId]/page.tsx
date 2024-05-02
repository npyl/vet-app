"use client";

import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { useParams } from "next/navigation";
import { List, ListItem } from "@/components/List";
import useSWR from "swr";
import { ProfileSkeleton } from "@/components/Skeleton";
import { IProduct } from "@/types/products";
import { Box, Divider, Stack, Typography, alpha } from "@mui/material";
import { SpaceBetween } from "@/components/styled";
import Iconify from "@/components/iconify";
import { ICONS } from "../constants";
import { styled } from "@mui/material/styles";

// ------------------------------------------------------------

const useProductById = (id: number) => {
    const { data, isLoading } = useSWR<IProduct>(`/api/stock/${id}`);
    return { product: data, isLoading };
};

// ------------------------------------------------------------

const ProductPage = () => {
    const { productId } = useParams();

    const { product, isLoading } = useProductById(+productId);

    if (isLoading) {
        return <ProfileSkeleton avatar={false} />;
    }

    return (
        <Container maxWidth="md">
            <Paper
                elevation={20}
                sx={{
                    mt: 2,
                }}
            >
                <SpaceBetween p={2}>
                    <Stack direction="row" spacing={1} alignItems="center">
                        {product?.type ? (
                            <Stack
                                direction="row"
                                alignItems="center"
                                spacing={0.3}
                                px={0.5}
                                borderRadius="10px"
                                bgcolor={(theme) =>
                                    alpha(theme.palette.primary.main, 0.1)
                                }
                            >
                                <Iconify
                                    icon={ICONS[product?.type]}
                                    width={30}
                                    height={30}
                                    color="primary.main"
                                />
                                <Typography
                                    variant="subtitle2"
                                    color="primary.main"
                                    fontWeight={500}
                                >
                                    {product?.type}
                                </Typography>
                            </Stack>
                        ) : null}

                        <Typography variant="h6">{product?.name}</Typography>
                    </Stack>

                    <Stack
                        direction="row"
                        alignItems="center"
                        spacing={0.3}
                        px={0.5}
                        borderRadius="10px"
                        bgcolor={(theme) =>
                            alpha(
                                product?.stock && product?.stock >= 20
                                    ? theme.palette.primary.main
                                    : theme.palette.warning.main,
                                0.1,
                            )
                        }
                    >
                        <Iconify
                            icon="material-symbols-light:warehouse-outline"
                            width={30}
                            height={30}
                            color={
                                product?.stock && product?.stock >= 20
                                    ? "primary.main"
                                    : "warning.main"
                            }
                        />
                        <Typography
                            variant="subtitle2"
                            color={
                                product?.stock && product?.stock >= 20
                                    ? "primary.main"
                                    : "warning.main"
                            }
                            fontWeight={500}
                        >
                            {`${product?.stock} (in stock)`}
                        </Typography>
                    </Stack>
                </SpaceBetween>
                <Divider />
                <Grid container>
                    <Grid item xs={6}>
                        <List>
                            <ListItem label="Code" value={product?.code} />
                            <ListItem
                                label="Tax"
                                value={
                                    product?.tax === "TWENTY_THREE_PERCENT"
                                        ? "23%"
                                        : ""
                                }
                            />
                        </List>
                    </Grid>
                    <Grid item xs={6}>
                        <List>
                            <ListItem
                                label="Barcode"
                                value={product?.barcode}
                            />
                        </List>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
};

export default ProductPage;
