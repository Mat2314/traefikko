import {Injectable} from "@angular/core";
import {HttpEvent, HttpInterceptor, HttpResponse} from "@angular/common/http";
import {HttpHandler, HttpRequest, HttpErrorResponse} from "@angular/common/http";

import {Observable, throwError, BehaviorSubject} from "rxjs";
import {catchError, switchMap, take, filter} from 'rxjs/operators';
import {AuthService} from "../app/services/auth.service";


@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {

  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(public authService: AuthService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authService.getAccessToken()) {
      request = this.addToken(request, this.authService.getAccessToken())
    }

    return next.handle(request).pipe(catchError(error => {
      if (error instanceof HttpErrorResponse && error.status === 401 || error.status == 400) {
        if (request.url.includes("refresh")) {
          this.authService.logout("Wylogowano - Sesja wygasła");

        } else if (request.url.includes("api/token")) {
          this.authService.logout("Niepoprawne dane logowania");

        } else {
          return this.handle401Error(request, next);
        }
        return throwError(error);
      } else {
        return throwError(error);
      }
    }));
  }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        'Authorization': `Bearer ${token}`,
      }
    });
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authService.refreshToken().pipe(
        switchMap((token: any) => {
          this.isRefreshing = false;
          this.refreshTokenSubject.next(token.access);

          return next.handle(this.addToken(request, token.access));
        }));
    } else {
      this.isRefreshing = false;
      return this.refreshTokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(access => {
          return next.handle(this.addToken(request, access));
        })
      );
    }
  }

}
