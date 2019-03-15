import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {CartResponse} from './models/cartresponse';
import { DeleteCartResponse } from './models/deletecartresponse';
import { Cart } from './models/cart';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartUrl:string = 'http://localhost:3000/cart';

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
}
