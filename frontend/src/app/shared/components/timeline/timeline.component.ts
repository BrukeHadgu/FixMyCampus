import { Component, Input } from '@angular/core';
import { TicketHistory } from '../../models/ticket-history.model';
import { formatDate } from '../../utils/date.util';
import { getStatusLabel } from '../../utils/status.util';

@Component({
  selector: 'app-timeline',
  standalone: true,
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.scss',
})
export class TimelineComponent {
  @Input() events: TicketHistory[] = [];

  formatDate(value: string): string {
    return formatDate(value);
  }

  getStatusLabel(status: number): string {
    return getStatusLabel(status);
  }
}
