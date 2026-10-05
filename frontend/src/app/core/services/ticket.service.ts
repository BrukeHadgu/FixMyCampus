import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { API_ENDPOINTS } from '../constants/api-endpoints';

export interface Ticket {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
}

@Injectable({ providedIn: 'root' })
export class TicketService {
  private readonly http = inject(HttpClient);

  getAll(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(API_ENDPOINTS.tickets);
  }

  getById(id: string): Observable<Ticket> {
    return this.http.get<Ticket>(`${API_ENDPOINTS.tickets}/${id}`);
  }

  create(ticket: Omit<Ticket, 'id'>): Observable<Ticket> {
    return this.http.post<Ticket>(API_ENDPOINTS.tickets, ticket);
  }

  update(id: string, ticket: Partial<Omit<Ticket, 'id'>>): Observable<Ticket> {
    return this.http.put<Ticket>(`${API_ENDPOINTS.tickets}/${id}`, ticket);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${API_ENDPOINTS.tickets}/${id}`);
  }
}