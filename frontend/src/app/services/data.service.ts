import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient, private router: Router) { }

  getBooks(params: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/books/all/`, {params: params});
  }

  addNewBook(payload: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/books/all/`, payload);
  }

  deleteBook(id: string): Observable<any> {
    let params = new HttpParams().set('id', id);
    return this.http.delete(`${this.apiUrl}/books/all/`, {params: params});
  }
}
