import {Cart} from './cart';

export class CartResponse{
    success: boolean;
    message: string;
    cart: Cart;
}