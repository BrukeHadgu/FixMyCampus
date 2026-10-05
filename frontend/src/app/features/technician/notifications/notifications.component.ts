import { DatePipe } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideArrowUpRight, LucideBell } from '@lucide/angular';
import { AuthService } from '../../../core/services/auth.service';
import { TicketService } from '../../../core/services/ticket.service';

@Component({
  selector: 'app-notifications',
  imports: [DatePipe, RouterLink, LucideArrowUpRight, LucideBell],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss',
})
export class NotificationsComponent {
  private readonly auth = inject(AuthService);
  private readonly ticketService = inject(TicketService);
  protected readonly notifications = computed(() => this.ticketService.tickets()
    .filter((ticket) => ticket.assigneeName === this.auth.userName())
    .map((ticket) => ({ ...ticket, message: ticket.status === 'assigned' ? 'A new ticket has been assigned to you.' : 'A ticket in your queue was updated.' })));
}
