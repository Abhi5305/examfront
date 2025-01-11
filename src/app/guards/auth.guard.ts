import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private loginService: LoginService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const requiredRoles = route.data['roles'];
    const userRoles = this.loginService.getUserRoles(); // Fetch roles from service

    if (requiredRoles.some((role: string) => userRoles.includes(role))) {
      return true;
    }

    // Redirect if roles do not match
    this.router.navigate(['/']);
    return false;
  }
}
