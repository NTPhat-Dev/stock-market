import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';

export interface User {
  id: number;
  username: string;
}

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly http = inject(HttpClient);
  readonly user = signal<User | null>(null);

  restore(): Observable<boolean> {
    return this.http.get<User>('/api/auth/me').pipe(
      tap((user) => this.user.set(user)),
      map(() => true),
      catchError(() => {
        this.user.set(null);
        return of(false);
      }),
    );
  }

  login(credentials: { username: string; password: string }): Observable<User> {
    return this.http
      .post<User>('/api/auth/login', credentials)
      .pipe(tap((user) => this.user.set(user)));
  }

  register(credentials: { username: string; password: string }): Observable<User> {
    return this.http
      .post<User>('/api/auth/register', credentials)
      .pipe(tap((user) => this.user.set(user)));
  }

  logout(): Observable<void> {
    return this.http.post<void>('/api/auth/logout', {}).pipe(tap(() => this.user.set(null)));
  }
}
