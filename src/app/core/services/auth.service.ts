import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // private baseUrl = 'https://localhost:44387/api/auth';
   private apiUrl = 'http://shirkeash-001-site1.ltempurl.com/api/auth';

  constructor(private http: HttpClient) {}

  // -------------------------
  // INIT FROM LOCALSTORAGE
  // -------------------------
  private storedUser = JSON.parse(localStorage.getItem('user') || 'null');

  private loggedIn = new BehaviorSubject<boolean>(!!this.storedUser);
  isLoggedIn$ = this.loggedIn.asObservable();

  private currentUser = new BehaviorSubject<any>(this.storedUser);
  currentUser$ = this.currentUser.asObservable();

 

 getUser() {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
}

 getUserId(): number {
  const user = this.getUser();
  return Number(user?.Id ?? user?.id ?? 0);
}
  
  // -------------------------
  // API CALLS
  // -------------------------
  register(data: any) {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  login(data: any) {
    return this.http.post(`${this.apiUrl}/login`, data);
  }

  // -------------------------
  // SET USER
  // -------------------------
 setUser(user:any){

    localStorage.setItem('user',JSON.stringify(user));

    this.loggedIn.next(true);

    this.currentUser.next(user);

}

  // -------------------------
  // LOGOUT
  // -------------------------
  logout() {
    localStorage.removeItem('user');
    this.loggedIn.next(false);
    this.currentUser.next(null);
  }
}