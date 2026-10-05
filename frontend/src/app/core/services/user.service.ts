import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { API_ENDPOINTS } from '../constants/api-endpoints';

export interface AppUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly http = inject(HttpClient);

  getAll(): Observable<AppUser[]> {
    return this.http.get<AppUser[]>(API_ENDPOINTS.users);
  }

  getById(id: string): Observable<AppUser> {
    return this.http.get<AppUser>(`${API_ENDPOINTS.users}/${id}`);
  }
}
