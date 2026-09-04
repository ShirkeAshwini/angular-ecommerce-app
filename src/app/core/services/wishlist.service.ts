import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  // private apiUrl = 'https://localhost:44387/api/wishlist';
     private apiUrl = 'https://shirkeash-001-site1.ltempurl.com/api/wishlist';


  private wishlistCountSubject = new BehaviorSubject<number>(0);
  wishlistCount$ = this.wishlistCountSubject.asObservable();

  setWishlistCount(count: number){
    this.wishlistCountSubject.next(count);
  }

  constructor(private http: HttpClient) {}

  // GET wishlist by user
  getWishlist(userId: number): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.apiUrl}/user/${userId}`
    );
  }

  // ADD wishlist
  addToWishlist(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, data);
  }

  // REMOVE wishlist
  removeFromWishlist(id: number): Observable<any> {
    return this.http.delete(`http://shirkeash-001-site1.ltempurl.com/api/wishlist/remove/${id}`);
  }
}