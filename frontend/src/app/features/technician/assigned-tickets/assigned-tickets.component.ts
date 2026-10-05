import { Component, computed, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LucideArrowUpRight, LucideSearch, LucideSlidersHorizontal, LucideWrench } from '@lucide/angular';
import { AuthService } from '../../../core/services/auth.service';
import { TicketService } from '../../../core/services/ticket.service';
import { TicketStatus } from '../../../shared/enums/ticket-status.enum';
import { getTicketStatusLabel } from '../../../shared/utils/status.util';

@Component({
  selector: 'app-assigned-tickets',
  imports: [DatePipe, RouterLink, LucideArrowUpRight, LucideSearch, LucideSlidersHorizontal, LucideWrench],
  templateUrl: './assigned-tickets.component.html',
  styleUrl: './assigned-tickets.component.scss',
})
export class AssignedTicketsComponent {
  private readonly auth = inject(AuthService);
  private readonly ticketService = inject(TicketService);
  protected readonly query = signal('');
  protected readonly statusFilter = signal('All statuses');
  protected readonly statusLabel = getTicketStatusLabel;
  protected readonly statuses = ['All statuses', 'New', 'Assigned', 'In progress', 'Resolved'];
  protected readonly tickets = computed(() => this.ticketService.tickets()
    .filter((ticket) => ticket.assigneeName === this.auth.userName())
    .filter((ticket) => !this.query() || `${ticket.title} ${ticket.id} ${ticket.building}`.toLowerCase().includes(this.query().toLowerCase()))
    .filter((ticket) => this.statusFilter() === 'All statuses' || this.statusLabel(ticket.status) === this.statusFilter()));
}
