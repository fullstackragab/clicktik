import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new BehaviorSubject<any>(undefined);

  constructor(private readonly http: HttpClient) {}

  login(username: string, password: string) {
    return this.http
      .post(environment.apiUrl + 'auth/login', {
        username,
        password,
      })
      .pipe(
        tap((t: any) => {
          if (t && t.id) this.user.next(t);
          sessionStorage.setItem('USER', JSON.stringify(t));
        })
      );
  }

  logout() {
    this.user.next(undefined);
    sessionStorage.removeItem('USER');
  }
}
