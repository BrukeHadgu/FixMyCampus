import { Component, Input } from '@angular/core';
import { TicketStatus } from '../../enums/ticket-status.enum';
import { getStatusClass, getStatusLabel } from '../../utils/status.util';

@Component({
  selector: 'app-status-badge',
  standalone: true,
  templateUrl: './status-badge.component.html',
  styleUrl: './status-badge.component.scss',
})
export class StatusBadgeComponent {
  @Input({ required: true }) status!: TicketStatus | number | string;

  get label(): string {
    return getStatusLabel(this.status);
  }

  get statusClass(): string {
    return getStatusClass(this.status);
  }
}
