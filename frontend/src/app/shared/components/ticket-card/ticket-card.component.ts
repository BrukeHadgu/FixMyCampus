import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Ticket } from '../../models/ticket.model';
import { StatusBadgeComponent } from '../status-badge/status-badge.component';

@Component({
  selector: 'app-ticket-card',
  standalone: true,
  imports: [StatusBadgeComponent],
  templateUrl: './ticket-card.component.html',
  styleUrl: './ticket-card.component.scss',
})
export class TicketCardComponent {
  @Input({ required: true }) ticket!: Ticket;
  @Output() selected = new EventEmitter<Ticket>();
}
