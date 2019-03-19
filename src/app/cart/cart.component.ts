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

  deleteCart():void{
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

  postCard() :void{
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



}
