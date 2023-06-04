import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { Employee, EmployeeResponse } from '../models/employee.model';
@Injectable({
  providedIn: 'root'
})
export class DocumentsService {

  private apiUrl: string = environment.baseUrl + 'documents';
  constructor(private http: HttpClient) { }

  getAll(page = 0, size = 10): Observable<EmployeeResponse[]> {
    let params = new HttpParams;

    params = params.append('pageNo', String(page));
    params = params.append('itemsPerPage', String(size));

    return this.http.get<EmployeeResponse[]>(this.apiUrl);
  }

  add(body: any): Observable<Employee> {
    return this.http.post<Employee>(this.apiUrl, body);
  }

  getLogedIn(email: any): Observable<Employee> {
    const url = `${this.apiUrl}/getLogin/${email}`;
    return this.http.get<Employee>(url);
  }

  getById(id: any): Observable<Employee> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Employee>(url);
  }

  update(id: any, body: any): Observable<Employee> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Employee>(url, body);
  }

  delete(id: any): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }

}
