import { Component, computed, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LucideCircleCheck, LucidePlus, LucideRotateCw, LucideSparkles, LucideTicket, LucideWrench } from '@lucide/angular';
import { TicketService } from '../../../core/services/ticket.service';
import { AuthService } from '../../../core/services/auth.service';
import { TicketStatus } from '../../../shared/enums/ticket-status.enum';
import { getTicketStatusLabel } from '../../../shared/utils/status.util';

@Component({
  selector: 'app-dashboard',
  imports: [DatePipe, RouterLink, LucideCircleCheck, LucidePlus, LucideRotateCw, LucideSparkles, LucideTicket, LucideWrench],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  private readonly ticketService = inject(TicketService);
  private readonly auth = inject(AuthService);

  protected readonly userName = this.auth.userName;
  protected readonly recentTickets = computed(() => this.ticketService.tickets().slice(0, 4));
  protected readonly totalReports = computed(() => this.ticketService.tickets().length);
  protected readonly newReports = computed(() => this.ticketService.tickets().filter((ticket) => ticket.status === TicketStatus.Open).length);
  protected readonly inProgressReports = computed(() => this.ticketService.tickets().filter((ticket) => ticket.status === TicketStatus.InProgress).length);
  protected readonly resolvedReports = this.ticketService.resolvedCount;
  protected statusLabel(status: TicketStatus): string {
    return status === TicketStatus.Open ? 'New' : getTicketStatusLabel(status);
  }

  protected firstName(): string {
    return this.userName().split(' ')[0] || 'there';
  }
}
