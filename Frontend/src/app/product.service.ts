import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  uri = 'http://localhost:8081';
  constructor(private http: HttpClient) { }
  fetchProducts() {
    return this.http.get(`${this.uri}/products`);
  }
}
