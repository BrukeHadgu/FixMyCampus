import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Notification } from '../../models/notification.model';
import { formatDate } from '../../utils/date.util';

@Component({
  selector: 'app-notification-bell',
  standalone: true,
  templateUrl: './notification-bell.component.html',
  styleUrl: './notification-bell.component.scss',
})
export class NotificationBellComponent {
  @Input() notifications: Notification[] = [];
  @Output() notificationSelected = new EventEmitter<Notification>();
  @Output() markAllRead = new EventEmitter<void>();

  get unreadCount(): number {
    return this.notifications.filter((notification) => !notification.isRead).length;
  }

  formatDate(value: string): string {
    return formatDate(value);
  }
}
