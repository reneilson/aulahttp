import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  // constructor(private authService: AuthService){}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // const header = new HttpHeaders({
    //   'Authorization': this.authService.getAuthorizationCode(),
    //   'Content-Type': 'application/json'
    // })
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const copyReq = req.clone({
      headers: header,
    });
    return next.handle(copyReq);
  }
}
