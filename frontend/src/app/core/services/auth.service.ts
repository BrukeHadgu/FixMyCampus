import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

import { APP_CONSTANTS } from '../constants/app.constants';
import { API_ENDPOINTS } from '../constants/api-endpoints';

export interface AuthUser {
  id: string;
  email: string;
  role: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  user: AuthUser;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(API_ENDPOINTS.auth.login, credentials).pipe(
      tap((response) => {
        localStorage.setItem(APP_CONSTANTS.authTokenStorageKey, response.accessToken);
        localStorage.setItem(APP_CONSTANTS.currentUserStorageKey, JSON.stringify(response.user));
      })
    );
  }

  getToken(): string | null {
    return localStorage.getItem(APP_CONSTANTS.authTokenStorageKey);
  }

  getCurrentUser(): AuthUser | null {
    const user = localStorage.getItem(APP_CONSTANTS.currentUserStorageKey);

    if (!user) {
      return null;
    }

    try {
      return JSON.parse(user) as AuthUser;
    } catch {
      return null;
    }
  }

  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  hasRole(roles: readonly string[]): boolean {
    const user = this.getCurrentUser();
    return user !== null && roles.includes(user.role);
  }

  logout(): void {
    localStorage.removeItem(APP_CONSTANTS.authTokenStorageKey);
    localStorage.removeItem(APP_CONSTANTS.currentUserStorageKey);
    void this.router.navigateByUrl(APP_CONSTANTS.loginRoute);
  }
}