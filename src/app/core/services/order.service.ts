import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  // baseUrl = 'https://localhost:44387/api/orders';
    private apiUrl = 'http://shirkeash-001-site1.ltempurl.com/api/orders';


  constructor(private http:HttpClient) { }

  placeOrder(orderData: any): Observable<any>{
    return this.http.post(`${this.apiUrl}/place`,orderData);
  }

   getOrdersByUser(userId: number) : Observable<any> {
    return this.http.get(`${this.apiUrl}/user/${userId}`);
  }

  updateStatus(orderId: number, status:string){
    return this.http.put(
      `http://shirkeash-001-site1.ltempurl.com/api/orders/update-status/${orderId}`,
      JSON.stringify(status),
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
  }

  getAllOrders(){
    return this.http.get<any[]>(
      `http://shirkeash-001-site1.ltempurl.com/api/orders/all`
    );
  }
}
