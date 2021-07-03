import {
  HttpErrorResponse,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { defer, Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}

  /**
   * Intercept request to authorize request with oauth service.
   * @param req original request
   * @param next next
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    const self = this;

    if (self.checkUrl(request)) {
      const authHandle = defer(() => {
        const authorizedReq = request.clone({
          headers: request.headers
            .set(
              'Authorization',
              `Bearer ${self.authService.getStoredToken()!.token}`
            )
            .set('Access-Control-Allow-Origin', '*'),
        });
        return next.handle(authorizedReq);
      });

      return authHandle.pipe(
        retry(1),
        catchError((requestError) => {
          if (
            requestError instanceof HttpErrorResponse &&
            requestError.status === 401
          ) {
            self.authService.logout();
            this.router.navigate(['login']);
            return throwError(requestError);
          } else {
            return throwError(requestError);
          }
        })
      );
    } else {
      return next.handle(request);
    }
  }

  /**
   * Check if request is required authentication.
   * @param req request
   */
  private checkUrl(req: HttpRequest<any>) {
    if (
      req.url.toString().includes('authenticate') ||
      (req.url.toString().includes('users') && req.method == 'POST')
    )
      return false;
    return true;
  }
}
