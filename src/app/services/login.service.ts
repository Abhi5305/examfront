import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { BehaviorSubject, generate, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public loggedInStatus = new BehaviorSubject<boolean>(this.checkToken());

  isLoggedIn$ = this.loggedInStatus.asObservable();
  constructor(private http : HttpClient) { }

  public generateToken(credential : any): Observable<any> {
    //here in baseUrl we need to use backtick
   return this.http.post(`${baseUrl}/generate`,credential);
  }
  public getCurrentUser(){
    return this.http.get(`${baseUrl}/current`);
  }
  login(token: string): void {
    localStorage.setItem('token', token); // Save token
    this.loggedInStatus.next(true); // Update login status
  }
  public getToken(){
    return localStorage.getItem('token');
  }
  private checkToken(): boolean {
    return !!localStorage.getItem('token'); 
  }
  isLoggedIn(): boolean {
    return this.loggedInStatus.value;
  } 
  logout(): void {
    localStorage.removeItem('token'); // Remove token
    localStorage.removeItem('user'); // remove logged in user
    this.loggedInStatus.next(false); // Update login status
  }
  public saveUser(user:any){
    localStorage.setItem('user',JSON.stringify(user));
    return true;
  }
  public getUser(){
    let userStr = localStorage.getItem('user');
    if(userStr != null){
      return JSON.parse(userStr);
    }else{
      this.logout();
      return null;
    }
  }
    // Get user roles from stored data
  public  getUserRoles(): string[] {
      const userData = this.getUser();
      return userData ? userData.authorities.map((auth: any) => auth.authority) : [];
    }
}
