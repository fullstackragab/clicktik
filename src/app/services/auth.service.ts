import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new BehaviorSubject<User | undefined>(undefined);

  constructor(private readonly http: HttpClient) {}

  login(username: string, password: string) {
    return this.http
      .post<User>(environment.apiUrl + 'auth/login', {
        username,
        password,
      })
      .pipe(
        tap((user: User) => {
          if (user && user.id) this.user.next(user);
          sessionStorage.setItem('USER', JSON.stringify(user));
        })
      );
  }

  logout() {
    this.user.next(undefined);
    sessionStorage.removeItem('USER');
  }
}
