import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProductResponse } from './models/productresponse';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productUrl:string = 'http://localhost:3000/product/all';
 

  constructor(private http: HttpClient) { }

  getAllProducts() :Observable<ProductResponse> {
    return this.http.get<ProductResponse>(this.productUrl);
  }
}
