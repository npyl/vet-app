import { ProductType, TaxType } from "@prisma/client";

export interface IProduct {
    id: number;
    code: string;
    barcode: string;
    type: ProductType;
    name: string;
    cost: number;
    tax: TaxType;
    stock: number;
}

export interface IProductPOST extends Omit<IProduct, "id"> {
    id?: number;
}
