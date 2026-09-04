import { Injectable } from '@angular/core';
import { Product } from 'src/app/shared/models/product.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  // baseUrl = 'https://localhost:44387/api/products';
   private apiUrl = 'https://shirkeash-001-site1.ltempurl.com/api/products';


  constructor(private http: HttpClient) {}

  // getProducts() {
  //   return this.http.get(`${this.baseUrl}/all`);
  // }

  addProduct(data: any) {
    return this.http.post(`${this.apiUrl}/add`, data);
  }

  deleteProduct(id: number) {
    return this.http.delete(`${this.apiUrl}/delete/${id}`);
  }

  getProductById(id: number) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
  
  updateProduct(id: number, data: FormData) {
  return this.http.put(`${this.apiUrl}/update/${id}`, data);
}

getProducts() {
  return this.http.get<Product[]>(`${this.apiUrl}/all`);
}

}
