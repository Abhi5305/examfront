import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http : HttpClient) {  }

  public addUser(user : any): Observable<any> {
    //here in baseUrl we need to use backtick
   return this.http.post(`${baseUrl}/welcome/user`,user);
  }
}
