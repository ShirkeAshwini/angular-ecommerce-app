import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  // private baseUrl = 'https://localhost:44387/api/dashboard';
   baseUrl = 'https://your-api-domain.com/api/dashboard';

 
  constructor(private https: HttpClient) { }

  getDashboardStats() {
  return this.https.get<any>('https://localhost:44387/api/dashboard/stats');
}
}
