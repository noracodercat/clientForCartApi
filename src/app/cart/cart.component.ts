import { Component, OnInit } from '@angular/core';
import {CartService} from '../cart.service';
import { Cart } from '../models/cart';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: Cart;
  errorMessage: string;

  constructor(private cartService: CartService) { }

  ngOnInit() {
      this.cart =null;
      this.getCart();
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
