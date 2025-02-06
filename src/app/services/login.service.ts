import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public loggedInStatus = new BehaviorSubject<boolean>(this.checkToken());
  isLoggedIn$ = this.loggedInStatus.asObservable();

  constructor(private http: HttpClient) {}

  public generateToken(credential: any): Observable<any> {
    return this.http.post(`${baseUrl}/welcome/generate`, credential);
  }

  public getCurrentUser() {
    return this.http.get(`${baseUrl}/welcome/current`);
  }

  login(token: string): void {
    sessionStorage.setItem('token', token); // Use sessionStorage
    this.loggedInStatus.next(true);
  }

  public getToken() {
    return sessionStorage.getItem('token'); // Use sessionStorage
  }

  private checkToken(): boolean {
    return !!sessionStorage.getItem('token'); // Use sessionStorage
  }

  isLoggedIn(): boolean {
    return this.loggedInStatus.value;
  }

  logout(): void {
    sessionStorage.removeItem('token'); // Use sessionStorage
    sessionStorage.removeItem('user'); // Remove logged-in user
    this.loggedInStatus.next(false);
  }

  public saveUser(user: any) {
    sessionStorage.setItem('user', JSON.stringify(user)); // Use sessionStorage
    return true;
  }

  public getUser() {
    let userStr = sessionStorage.getItem('user'); // Use sessionStorage
    if (userStr != null) {
      return JSON.parse(userStr);
    } else {
      this.logout();
      return null;
    }
  }

  public getUserRoles(): string[] {
    const userData = this.getUser();
    return userData ? userData.authorities.map((auth: any) => auth.authority) : [];
  }
}
