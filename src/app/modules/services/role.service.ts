import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { Role, RoleResponse } from '../models/role.model';
@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private apiUrl: string = environment.baseUrl + 'roles';
  constructor(private http: HttpClient) { }

  getAll(page = 0, size = 10): Observable<RoleResponse[]> {
    let params = new HttpParams;

    params = params.append('pageNo', String(page));
    params = params.append('itemsPerPage', String(size));

    return this.http.get<RoleResponse[]>(this.apiUrl);
  }

  add(body: Role): Observable<Role> {
    return this.http.post<Role>(this.apiUrl, body);
  }

  getById(id: any): Observable<Role> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Role>(url);
  }

  update(id: any, body: any): Observable<Role> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Role>(url, body);
  }

  delete(id: any): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }

}
