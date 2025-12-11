import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
//service file allows for angular to request data from the node server (returns observables)

//creates the following class at the root of the entire site so that all can access it.
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  //the following observables allow for the services to sub to them, returning the data needed.
  getProducts(): Observable<any> {
    return this.http.get(`${this.apiUrl}/products`);
  }

  selectProduct(product: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/select-product`, product);
  }

  getSelectedProduct(): Observable<any> {
    return this.http.get(`${this.apiUrl}/selected-product`);
  }

  submitOrder(orderData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/submit-order`, orderData);
  }
}