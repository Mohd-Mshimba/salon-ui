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
  getAll(page = 0, size = 10): Observable<AuthResponse[]> {
    return this.http.get<AuthResponse[]>(this.apiUrl);
  }

  add(body: Auth): Observable<Auth> {
    return this.http.post<Auth>(this.apiUrl, body);
  }

  login(username: string, password: string): Observable<Auth> {
    const url = `${this.apiUrl}/${username}/${password}`;
    return this.http.get<Auth>(url);
  }

  update(id: any, body: any): Observable<Auth> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Auth>(url, body);
  }

  delete(id: any): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }

  deleteByUsername(id: any): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }


}
