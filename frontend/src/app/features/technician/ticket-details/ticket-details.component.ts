import { DatePipe } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { LucideArrowLeft, LucideCheck, LucideMapPin, LucideWrench } from '@lucide/angular';
import { TicketService } from '../../../core/services/ticket.service';
import { TicketStatus } from '../../../shared/enums/ticket-status.enum';
import { getTicketStatusLabel } from '../../../shared/utils/status.util';

@Component({
  selector: 'app-technician-ticket-details',
  imports: [DatePipe, RouterLink, LucideArrowLeft, LucideCheck, LucideMapPin, LucideWrench],
  templateUrl: './ticket-details.component.html',
  styleUrl: './ticket-details.component.scss',
})
export class TicketDetailsComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly ticketService = inject(TicketService);
  private readonly ticketId = this.route.snapshot.paramMap.get('id') ?? '';
  protected readonly ticket = computed(() => this.ticketService.getById(this.ticketId));
  protected readonly statusLabel = getTicketStatusLabel;
  protected readonly TicketStatus = TicketStatus;

  protected startWork(): void { this.ticketService.updateStatus(this.ticketId, TicketStatus.InProgress); }
  protected resolve(): void { this.ticketService.updateStatus(this.ticketId, TicketStatus.Resolved); }
}
