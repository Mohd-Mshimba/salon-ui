import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { Customer, CustomerResponse } from '../models/customer.model';
@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private apiUrl: string = environment.baseUrl + 'customer';
  constructor(private http: HttpClient) { }

  getAll(page = 0, size = 10): Observable<CustomerResponse[]> {
    let params = new HttpParams;

    params = params.append('pageNo', String(page));
    params = params.append('itemsPerPage', String(size));

    return this.http.get<CustomerResponse[]>(this.apiUrl);
  }

  add(body: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.apiUrl, body);
  }

  getById(id: any): Observable<Customer> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Customer>(url);
  }

  update(id: any, body: any): Observable<Customer> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Customer>(url, body);
  }
}
