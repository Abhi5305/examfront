import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from './services/login.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private login:LoginService){}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Retrieve token from localStorage or any other storage
    console.log(localStorage)
    const authToken = this.login.getToken();
    console.log(authToken)

    // Clone the request and add the Authorization header if the token exists
    if (authToken != null) {
      const clonedReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}`
        }
      });
      return next.handle(clonedReq); // Pass the cloned request
    }

    // If no token, pass the original request
    return next.handle(req);
  }
}
