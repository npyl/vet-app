export interface IProduct {
    id: number;
    code: string;
    barcode: string;
    type: "ANIMAL_FEED" | "MEDICINE" | "TOY";
    name: string;
    cost: number;
    tax: "23%";
    stock: number;
}
