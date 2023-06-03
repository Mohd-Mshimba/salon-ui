import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { Appointment, AppointmentResponse } from '../models/appointment.model';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private apiUrl: string = environment.baseUrl + 'appointment';
  constructor(private http: HttpClient) { }

  getAll(page = 0, size = 10): Observable<AppointmentResponse[]> {
    let params = new HttpParams;

    params = params.append('pageNo', String(page));
    params = params.append('itemsPerPage', String(size));

    return this.http.get<AppointmentResponse[]>(this.apiUrl);
  }

  add(body: any): Observable<Appointment> {
    return this.http.post<Appointment>(this.apiUrl, body);
  }

  getLogedIn(email: any): Observable<Appointment> {
    const url = `${this.apiUrl}/getLogin/${email}`;
    return this.http.get<Appointment>(url);
  }

  getById(id: any): Observable<Appointment> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Appointment>(url);
  }

  getAppointmentByEmail(id: any): Observable<Appointment> {
    const url = `${this.apiUrl}/getAppointByEmail/${id}`;
    return this.http.get<Appointment>(url);
  }

  update(id: any, body: any): Observable<Appointment> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Appointment>(url, body);
  }

  delete(id: any): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }

}
