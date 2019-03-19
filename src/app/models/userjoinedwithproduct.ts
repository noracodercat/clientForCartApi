import { Cart } from './cart';
import { ProductData } from './productdata';
import { CartWithOnlyOneItem } from './cartwithonlyoneitem';

export class UserJoinedWithProduct{
    
        _id: string;
        username: string;
        password:string;
        cart: CartWithOnlyOneItem; //in this data structure, cart.items is not an array of items just holds one single item object , and the id of this element matches item_data's one and only element's id
        item_data: ProductData[]; //always contains 1 single element, and the id of this element matches the cart.items' one and only element's id
    
}