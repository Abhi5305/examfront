import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http : HttpClient) {  }

  public addUser(user : any){
    //here in baseUrl we need to use backtick
   return this.http.post(`${baseUrl}/users/`,user);
  }
}
