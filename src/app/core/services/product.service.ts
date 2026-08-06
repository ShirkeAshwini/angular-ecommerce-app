import { Injectable } from '@angular/core';
import { Product } from 'src/app/shared/models/product.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = 'https://localhost:44387/api/products';

  constructor(private http: HttpClient) {}

  // getProducts() {
  //   return this.http.get(`${this.baseUrl}/all`);
  // }

  addProduct(data: any) {
    return this.http.post(`${this.baseUrl}/add`, data);
  }

  deleteProduct(id: number) {
    return this.http.delete(`${this.baseUrl}/delete/${id}`);
  }

  getProductById(id: number) {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
  
  updateProduct(id: number, data: FormData) {
  return this.http.put(`${this.baseUrl}/update/${id}`, data);
}

getProducts() {
  return this.http.get<Product[]>(`${this.baseUrl}/all`);
}

}
