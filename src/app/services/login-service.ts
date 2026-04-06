import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserModel } from '../models/userModel';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  http = inject(HttpClient);
  path: string = 'http://localhost:8080';

  public createUser(user: UserModel): Observable<HttpResponse<number>> {
    return this.http.post<number>(`${this.path}/api/v2/users`, user, { observe: 'response' });
  }

  public checkExistsByEmail(email: string): Observable<HttpResponse<boolean>> {
    return this.http.get<boolean>(`${this.path}/api/v2/users/${email}`, { observe: 'response' });
  }

  public logIn(user: UserModel): Observable<HttpResponse<number>> {
    return this.http.get<number>(`${this.path}/api/v2/users`, {
      params: { email: user.email, password: user.password },
      observe: 'response',
    });
  }
}
