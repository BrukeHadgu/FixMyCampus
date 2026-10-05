import { DatePipe } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideArrowUpRight, LucideCalendarDays, LucideCircleCheck, LucideClock3, LucideTickets, LucideWrench } from '@lucide/angular';
import { AuthService } from '../../../core/services/auth.service';
import { TicketService } from '../../../core/services/ticket.service';
import { TicketStatus } from '../../../shared/enums/ticket-status.enum';
import { getTicketStatusLabel } from '../../../shared/utils/status.util';

@Component({
  selector: 'app-technician-dashboard',
  imports: [DatePipe, RouterLink, LucideArrowUpRight, LucideCalendarDays, LucideCircleCheck, LucideClock3, LucideTickets, LucideWrench],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  private readonly auth = inject(AuthService);
  private readonly ticketService = inject(TicketService);

  protected readonly userName = this.auth.userName;
  protected readonly workTickets = computed(() => this.ticketService.tickets().filter((ticket) => ticket.assigneeName === this.userName()));
  protected readonly inProgressCount = computed(() => this.workTickets().filter((ticket) => ticket.status === TicketStatus.InProgress).length);
  protected readonly assignedCount = computed(() => this.workTickets().filter((ticket) => ticket.status === TicketStatus.Assigned).length);
  protected readonly resolvedCount = computed(() => this.ticketService.tickets().filter((ticket) => ticket.assigneeName === this.userName() && ticket.status === TicketStatus.Resolved).length);
  protected readonly recentTickets = computed(() => this.workTickets().slice(0, 5));
  protected readonly statusLabel = getTicketStatusLabel;

  protected firstName(): string { return this.userName().split(' ')[0] || 'there'; }
}
