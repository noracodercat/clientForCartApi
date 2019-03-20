import { ProductData } from './productdata';

export class ProductResponse {
    success: boolean;
    message:string;
    products: ProductData[];
}