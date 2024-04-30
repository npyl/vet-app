import Dialog from "@/components/Dialog";
import { MenuItem, Stack, Typography } from "@mui/material";
import { useCallback, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useApiContext from "@/contexts/api";
import { LoadingButton } from "@mui/lab";
import useAuth from "@/hooks/useAuth";
import { IProduct, IProductPOST } from "@/types/products";
import { ProductType, TaxType } from "@prisma/client";
import {
    RHFOnlyNumbers,
    RHFSelect,
    RHFTextField,
} from "@/components/hook-form";

interface Props {
    open: boolean;
    onMutate: () => void;
    onClose: () => void;
    // ...
    product?: IProduct;
}

const Schema = yup
    .object<IProductPOST>()
    .shape({
        code: yup.string().required(),
        barcode: yup.string().required(),
        type: yup
            .string()
            .oneOf<ProductType>(["ANIMAL_FEED", "MEDICINE", "TOY"])
            .required(),
        name: yup.string().required(),
        cost: yup.number().required(),
        stock: yup.number().required(),
        tax: yup.string().oneOf<TaxType>(["TWENTY_THREE_PERCENT"]).required(),
    })
    .required();

const AddOrEditDialog = ({ product, onMutate, ...props }: Props) => {
    const { user } = useAuth();
    const workplaceId = user?.workplace?.id;
    console.log("workplaceId: ", workplaceId);

    const { post, put } = useApiContext();

    const [isLoading, setIsLoading] = useState(false);

    const methods = useForm<IProductPOST>({
        resolver: yupResolver(Schema) as any,
        values: {
            barcode: product?.barcode || "",
            code: product?.code || "",
            cost: product?.cost ?? -1,
            name: product?.name || "",
            stock: product?.stock ?? -1,
            tax: "TWENTY_THREE_PERCENT",
            type: product?.type ?? "ANIMAL_FEED",
            id: product?.id ?? undefined,
        },
    });

    const handleMutate = useCallback(() => {
        onMutate();
        props.onClose();
    }, []);

    const handleSubmit = useCallback(
        (d: IProductPOST) => {
            if (product) {
                // update
                put(`/api/stock`, {
                    body: JSON.stringify(d),
                }).then(handleMutate);
            } else {
                // create
                post(`/api/stock`, {
                    body: JSON.stringify(d),
                }).then(handleMutate);
            }
        },
        [product, workplaceId],
    );

    return (
        <FormProvider {...methods}>
            <Dialog
                {...props}
                // ...
                submit
                onSubmit={methods.handleSubmit(handleSubmit)}
                // ...
                maxWidth="sm"
                title={
                    <Typography variant="h6">
                        {product ? `Edit ${product.name}` : "Add Product"}
                    </Typography>
                }
                content={
                    <Stack mt={2} spacing={1} alignItems="center" width={1}>
                        <Stack spacing={1} direction="row">
                            <RHFTextField label="Name" name="name" />
                            <RHFSelect
                                labelPlacement="start"
                                label="Type"
                                name="type"
                            >
                                <MenuItem value="ANIMAL_FEED">
                                    Animal Feed
                                </MenuItem>
                                <MenuItem value="MEDICINE">Medicine</MenuItem>
                                <MenuItem value="TOY">Toy</MenuItem>
                            </RHFSelect>
                            <RHFOnlyNumbers label="Cost" name="cost" />
                        </Stack>
                        <Stack spacing={1} direction="row">
                            <RHFTextField label="Barcode" name="barcode" />
                            <RHFTextField label="Code" name="code" />
                        </Stack>
                    </Stack>
                }
                actions={
                    <LoadingButton
                        type="submit"
                        variant="contained"
                        disabled={isLoading}
                        loading={isLoading}
                    >
                        {product ? "Update" : "Add"}
                    </LoadingButton>
                }
            />
        </FormProvider>
    );
};

export default AddOrEditDialog;
