import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

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