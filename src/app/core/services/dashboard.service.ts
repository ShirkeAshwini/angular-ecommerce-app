import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  // private baseUrl = 'https://localhost:44387/api/dashboard';
   private apiUrl = 'https://shirkeash-001-site1.ltempurl.com/api/dashboard';


 
  constructor(private https: HttpClient) { }

  getDashboardStats() {
  return this.https.get<any>('http://shirkeash-001-site1.ltempurl.com/api/dashboard/stats');
}
}
