import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TicketStatus } from '../../enums/ticket-status.enum';
import { getStatusLabel } from '../../utils/status.util';

export interface TicketFilters {
  query: string;
  status: TicketStatus | null;
}

@Component({
  selector: 'app-filter-bar',
  standalone: true,
  templateUrl: './filter-bar.component.html',
  styleUrl: './filter-bar.component.scss',
})
export class FilterBarComponent {
  @Input() query = '';
  @Input() status: TicketStatus | null = null;
  @Output() filtersChanged = new EventEmitter<TicketFilters>();

  readonly statuses = Object.values(TicketStatus).filter(
    (value): value is TicketStatus => typeof value === 'number',
  );

  getStatusLabel(status: TicketStatus): string {
    return getStatusLabel(status);
  }

  updateQuery(query: string): void {
    this.query = query;
    this.emitFilters();
  }

  updateStatus(value: string): void {
    this.status = value === '' ? null : Number(value) as TicketStatus;
    this.emitFilters();
  }

  private emitFilters(): void {
    this.filtersChanged.emit({ query: this.query, status: this.status });
  }
}
