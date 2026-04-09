import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppointmentModel } from '../models/apointmentModel';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  path: string = 'http://localhost:8080';

  http = inject(HttpClient);

  public createAppointment(appointment: AppointmentModel): Observable<HttpResponse<number>> {
    return this.http.post<number>(`${this.path}/api/v2/appointments`, appointment, {
      observe: 'response',
    });
  }

  public findAllAppointments(): Observable<HttpResponse<AppointmentModel[]>> {
    return this.http.get<AppointmentModel[]>(`${this.path}/api/v2/appointments`, {
      observe: 'response',
    });
  }
}
