import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { API_ENDPOINTS } from '../constants/api-endpoints';

export interface AppNotification {
  id: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private readonly http = inject(HttpClient);

  getAll(): Observable<AppNotification[]> {
    return this.http.get<AppNotification[]>(API_ENDPOINTS.notifications);
  }

  markAsRead(id: string): Observable<void> {
    return this.http.patch<void>(`${API_ENDPOINTS.notifications}/${id}/read`, {});
  }
}