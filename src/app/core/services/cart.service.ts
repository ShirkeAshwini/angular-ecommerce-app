import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cart } from 'src/app/shared/models/cart.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  // private apiUrl = 'https://localhost:44387/api/cart';
    private apiUrl = 'https://shirkeash-001-site1.ltempurl.com/api/auth';

  constructor(private http: HttpClient) {}

 public getUserId(): number {
  const user = this.getUser();
  return Number(user?.Id ?? user?.id ?? 0);
}

private getUser(): any {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
}

 addToCart(cartItem: any) {
  return this.http.post(
    'http://shirkeash-001-site1.ltempurl.com/api/cart/add-to-cart',
    cartItem
  );
}

 getCartItems(): Observable<any[]> {
  const userId = this.getUserId();

  if (!userId || userId === 0) {
    console.log('No valid userId found');
    return new Observable(obs => obs.next([]));
  }

  return this.http.get<any[]>(`${this.apiUrl}/get-cart/${userId}`);
}


  updateCart(cartItem: any) {
  return this.http.put(
  'http://shirkeash-001-site1.ltempurl.com/api/cart/update',
  cartItem
);
}

  updateQuantity(cartId: number, quantity: number) {
  return this.http.put(
    `http://shirkeash-001-site1.ltempurl.com/api/cart/update`,
    { cartId, quantity }
  );
}

increaseQty(item: any) {
  return this.http.put(
    'http://shirkeash-001-site1.ltempurl.com/api/cart/increase',
    {
      userId: item.userId,
      productId: item.productId
    }
  );
}

decreaseQty(item: any) {
  return this.http.put(
    'http://shirkeash-001-site1.ltempurl.com/api/cart/decrease',
    {
      userId: item.userId,
      productId: item.productId
    }
  );
}

removeItem(id: number) {
  return this.http.delete(
    `http://shirkeash-001-site1.ltempurl.com/api/cart/remove/${id}`
  );
}

getCart(userId: number) {
  return this.http.get<any[]>(
    `http://shirkeash-001-site1.ltempurl.com/api/cart/get-cart/${userId}`
  );
}

private cartUpdated = new BehaviorSubject<boolean>(false);
cartUpdated$ = this.cartUpdated.asObservable();

refreshCart(){
  this.cartUpdated.next(true);
}

}