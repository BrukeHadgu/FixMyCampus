import { DatePipe, TitleCasePipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideArrowUpRight, LucideSlidersHorizontal } from '@lucide/angular';
import { TicketService } from '../../../core/services/ticket.service';
import { TicketStatus } from '../../../shared/enums/ticket-status.enum';
import { getTicketStatusLabel } from '../../../shared/utils/status.util';

@Component({
  selector: 'app-my-tickets',
  imports: [DatePipe, TitleCasePipe, RouterLink, LucideArrowUpRight, LucideSlidersHorizontal],
  templateUrl: './my-tickets.component.html',
  styleUrl: './my-tickets.component.scss',
})
export class MyTicketsComponent {
  private readonly ticketService = inject(TicketService);
  protected readonly statusFilter = signal('all');
  protected readonly filteredTickets = computed(() => {
    const filter = this.statusFilter();
    return this.ticketService.tickets().filter((ticket) => filter === 'all' || ticket.status === filter);
  });

  protected statusLabel(status: TicketStatus): string {
    return status === TicketStatus.Open ? 'New' : getTicketStatusLabel(status);
  }
}
