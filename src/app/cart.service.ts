import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {CartResponse} from './models/cartresponse';
import { DeleteCartResponse } from './models/deletecartresponse';
import { Cart } from './models/cart';
import { UserJoinedWithProductResponse } from './models/userjoinedwithproductresponse';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartUrl:string = 'http://localhost:3000/cart';
  private userProductUrl : string = 'http://localhost:3000/product/userscartjoinedtoproducts';

  constructor(private http: HttpClient) { }

  
  getCart(): Observable<CartResponse>{
    return this.http.get<CartResponse>(this.cartUrl);
  }

  deleteCart(): Observable<DeleteCartResponse> {
    return this.http.delete<DeleteCartResponse>(this.cartUrl,httpOptions);
  }

  postCart(cart :Cart) : Observable<CartResponse>{
    let formedCartBody = {
      cart :{
        items: cart.items
      } 
    };
    return this.http.post<CartResponse>(this.cartUrl,formedCartBody,httpOptions);
  }

  updateCart(itemId : string, amount: Number): Observable<any>{
    return this.http.put(this.cartUrl,{itemId: itemId, amount:amount},httpOptions);
  }

  deleteCartItemById(itemId: string): Observable<any>{
    return this.http.delete<any>(this.cartUrl + "/" + itemId ,httpOptions);
  }

  getAllProductDataForCartItems(): Observable<UserJoinedWithProductResponse>{
    return this.http.get<UserJoinedWithProductResponse>(this.userProductUrl);
  }
}
