import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppointmentModel } from '../models/apointmentModel';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  

  private readonly path: string = environment.api.backUrl;

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

  public deleteAppointment(appointmentId: number): Observable<HttpResponse<void>> {
    return this.http.delete<void>(`${this.path}/api/v2/appointments/${appointmentId}`, {
      observe: 'response',
    });
  }
}
