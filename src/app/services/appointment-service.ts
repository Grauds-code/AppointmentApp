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

  public findAllAppointments(email: string): Observable<HttpResponse<AppointmentModel[]>> {
    return this.http.get<AppointmentModel[]>(`${this.path}/api/v2/appointments`, {
      params: { email },
      observe: 'response',
    });
  }

  public registerForAppointment(
    appointmentId: number,
    email: string,
  ): Observable<HttpResponse<void>> {
    return this.http.post<void>(
      `${this.path}/api/v2/appointments/${appointmentId}/register`,
      null,
      {
        params: { email },
        observe: 'response',
      },
    );
  }

  public cancelRegistration(appointmentId: number, email: string): Observable<HttpResponse<void>> {
    return this.http.delete<void>(`${this.path}/api/v2/appointments/${appointmentId}/register`, {
      params: { email },
      observe: 'response',
    });
  }

  public updateAppointment(
    appointmentId: number,
    appointment: AppointmentModel,
  ): Observable<HttpResponse<void>> {
    return this.http.put<void>(`${this.path}/api/v2/appointments/${appointmentId}`, appointment, {
      observe: 'response',
    });
  }

  public deleteAppointment(appointmentId: number): Observable<HttpResponse<void>> {
    return this.http.delete<void>(`${this.path}/api/v2/appointments/${appointmentId}`, {
      observe: 'response',
    });
  }
}
