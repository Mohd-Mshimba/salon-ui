import { environment } from './../../../../environment/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Auth, AuthResponse } from '../models/auth.models';

@Injectable({
  providedIn: 'root'
})
export class AuthServices {
  private apiUrl: string = environment.baseUrl + 'login';

  constructor(private http: HttpClient) { }
  // getAll(page = 0, size = 10): Observable<AuthResponse[]> {
  //   let params = new HttpParams;

  //   params = params.append('pageNo', String(page));
  //   params = params.append('itemsPerPage', String(size));

  //   return this.http.get<AuthResponse[]>(this.apiUrl);
  // }

  add(body: Auth): Observable<Auth> {
    return this.http.post<Auth>(this.apiUrl, body);
  }

  login(username: string, password: string): Observable<Auth> {
    const url = `${this.apiUrl}/${username}/${password}`;
    return this.http.get<Auth>(url);
  }

  // update(id: any, body: any): Observable<Auth> {
  //   const url = `${this.apiUrl}/${id}`;
  //   return this.http.put<Auth>(url, body);
  // }
}
