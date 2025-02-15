import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs/operators';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  constructor(private spinner: NgxSpinnerService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Showing Spinner');
    this.spinner.show();

    const hideSpinner = () => {
      setTimeout(() => {
        console.log('Hiding Spinner after .5 sec');
        this.spinner.hide();
      }, 500);
    };

    return next.handle(req).pipe(
      finalize(() => hideSpinner()) // Ensures a minimum 5s visibility
    );
  }
}
