import { Component, OnInit } from '@angular/core';
import { ProductData } from '../models/productdata';
import { ProductService } from '../product.service';
import { first } from 'rxjs/operators';
import { Cart } from '../models/cart';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  products:ProductData[];
  cart: Cart;
  errorMessage :string;

  constructor(private productService:ProductService, private cartService: CartService) { }

  ngOnInit() {
    this.cart = null;
    this.products = null;
    this.getCart();
    this.getAllProducts();
  }

  getAllProducts():void{
    this.productService.getAllProducts()
    .pipe(first())
    .subscribe( productResponse => {
        if (productResponse.success ==true ){
          this.products = productResponse.products;
        } else {
          this.errorMessage = productResponse.message;
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

  putIntoCart(itemId : string){
    if (this.cart != null && this.cart.items.length > 0){ 
      let cartAlreadyContainsItem =false;
      for (let item of this.cart.items){
        if (item.id == itemId){ 
          cartAlreadyContainsItem = true;
        }
      }
      if (cartAlreadyContainsItem ==false){
        this.cart.items.push({id:itemId, amount: 1});
      }
      this.cartService.updateCart(itemId, 1).subscribe();
    } else {//cart does not contain anything, make post requst
      this.cart = {
        items: [
          {id: itemId,
          amount: 1}
        ]
      }
      this.postCart();
    }
  }


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
}
