import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { API_ENDPOINTS } from '../constants/api-endpoints';

export interface Technician {
  id: string;
  name: string;
  email: string;
}

@Injectable({ providedIn: 'root' })
export class TechnicianService {
  private readonly http = inject(HttpClient);

  getAll(): Observable<Technician[]> {
    return this.http.get<Technician[]>(API_ENDPOINTS.technicians);
  }

  getById(id: string): Observable<Technician> {
    return this.http.get<Technician>(`${API_ENDPOINTS.technicians}/${id}`);
  }
}