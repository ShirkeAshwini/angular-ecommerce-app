import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {

    const user =
      JSON.parse(localStorage.getItem('user') || '{}');

    if (user.role === 'admin') {
      return true;
    }

    this.router.navigate(['/']);
    return false;
  }
}