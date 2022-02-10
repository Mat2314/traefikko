import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Router} from "@angular/router";
import { tap, map, catchError } from 'rxjs/operators';
import {Observable, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl: string = environment.apiUrl;
  private ACCESS_TOKEN = "ACCESS_TOKEN";
  private REFRESH_TOKEN = "REFRESH_TOKEN";

  constructor(private http: HttpClient, private router: Router) { }

  getAccessToken() { return localStorage.getItem(this.ACCESS_TOKEN) || ""; }

  getRefreshToken() { return localStorage.getItem(this.REFRESH_TOKEN) || ""; }

  setAccessToken(token: string) { localStorage.setItem(this.ACCESS_TOKEN, token); }

  setRefreshToken(token: string) { localStorage.setItem(this.REFRESH_TOKEN, token); }

  setAccessRefreshTokens(tokens: any) {
    this.setAccessToken(tokens.access);
    this.setRefreshToken(tokens.refresh);
  }

  logout(message?: string) {
    localStorage.removeItem(this.ACCESS_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);

    this.router.navigate(['/']);

    // this.http.post(`${this.apiUrl}/core/logout/`, {}).subscribe(
    //   res => {
    //     console.log(res);
    //     this.router.navigate(['/']);
    //   }, err => {
    //     console.log(err);
    //   }
    // );
  }

  refreshToken() {
    return this.http.post(`${this.apiUrl}/api/token/refresh/`, {
      'refresh': this.getRefreshToken()
    }).pipe(tap((tokens: any) => {
      this.setAccessToken(tokens.access);
    }, err => {
      console.log(err);
    }));
  }

  login(formData: any): Observable<any> {
    console.log(this.apiUrl);

    return this.http.post(`${this.apiUrl}/api/token/`, formData, { withCredentials: true }).pipe(map((res: any) => {
      this.setAccessRefreshTokens(res);
      return res;
    }), catchError(err => {
      if (err.status === 401) {
      } else {
      }
      return throwError(err);
    })
    );
  }


}
