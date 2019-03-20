import { Component, OnInit } from '@angular/core';
import {CartService} from '../cart.service';
import { Cart } from '../models/cart';
import { first } from 'rxjs/operators';
import { UserJoinedWithProduct } from '../models/userjoinedwithproduct';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: Cart;
  errorMessage: string;
  joinedCollections :UserJoinedWithProduct[];

  constructor(private cartService: CartService) { }

  ngOnInit() {
      this.cart =null;
      this.joinedCollections=null;
      //this.getCart();
      this.getAllProductDataForCartItems();
  }

  getAllProductDataForCartItems():void {
    this.cartService.getAllProductDataForCartItems()
      .pipe(first())
      .subscribe( userJoinedWithProductResponse => {
          if (userJoinedWithProductResponse.success ==true ){
            this.joinedCollections = userJoinedWithProductResponse.joinedCollections;
            console.log(this.joinedCollections);
          } else {
            this.errorMessage = userJoinedWithProductResponse.message;
          }
        },error => {
          this.errorMessage = error;
        }
      );
  }

  incrementQuantityForItem(itemId : string):void{
   for (let userJoinedWithProduct of this.joinedCollections){
    if (userJoinedWithProduct.item_data[0].id == itemId){
      userJoinedWithProduct.cart.items.amount++;
      this.cartService.updateCart(itemId,userJoinedWithProduct.cart.items.amount).subscribe();
      break;
    }
   }
  }  

  decrementQuantityForItem(itemId : string):void{
    for (let userJoinedWithProduct of this.joinedCollections){
     if (userJoinedWithProduct.item_data[0].id == itemId){
       if(userJoinedWithProduct.cart.items.amount > 1){
        userJoinedWithProduct.cart.items.amount--;
        this.cartService.updateCart(itemId,userJoinedWithProduct.cart.items.amount).subscribe();
        break;
       }
     }
    }
  }  

  deleteItemFromCart(itemId: string):void{
    this.joinedCollections = this.joinedCollections.filter(function(userJoinedWithProduct) { 
      return userJoinedWithProduct.item_data[0].id !== itemId;
    });

    this.cartService.deleteCartItemById(itemId).subscribe();

  }


  deleteCart():void{
    this.joinedCollections = null;
    this.cartService.deleteCart()
      .pipe(first())
      .subscribe( deleteCartResponse => {
          if (deleteCartResponse.success ==true ){
            this.cart = null;
          } else {
            this.errorMessage = deleteCartResponse.message;
          }
        },error => {
          this.errorMessage = error;
        }
      );
  }

  /*
  postCart() :void{
    this.cartService.postCart(this.cart)
      .pipe(first())
      .subscribe( cartResponse => {
          if (cartResponse.success ==true ){
          } else {
            this.errorMessage = cartResponse.message;
          }
        },error => {
          this.errorMessage = error;
        }
      );
  }

  getCart() : void {
    this.cartService.getCart()
    .pipe(first())
    .subscribe( cartResponse => {
        if (cartResponse.success ==true ){
          this.cart = cartResponse.cart;
          console.log(this.cart);
        } else {
          this.errorMessage = cartResponse.message;
        }
      },error => {
        this.errorMessage = error;
      }
    );
  }
  */


}
