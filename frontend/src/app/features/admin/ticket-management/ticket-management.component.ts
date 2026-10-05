import { DatePipe, TitleCasePipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { LucideArrowLeft, LucideCircleCheck, LucideEllipsis, LucideLockKeyhole, LucideUserRoundPlus } from '@lucide/angular';
import { TicketService } from '../../../core/services/ticket.service';
import { TicketStatus } from '../../../shared/enums/ticket-status.enum';

@Component({
  selector: 'app-ticket-management',
  imports: [DatePipe, TitleCasePipe, RouterLink, LucideArrowLeft, LucideCircleCheck, LucideEllipsis, LucideLockKeyhole, LucideUserRoundPlus],
  templateUrl: './ticket-management.component.html',
  styleUrl: './ticket-management.component.scss',
})
export class TicketManagementComponent {
  protected readonly TicketStatus = TicketStatus;
  private readonly route = inject(ActivatedRoute);
  private readonly ticketService = inject(TicketService);
  private readonly routeParams = toSignal(this.route.paramMap, { initialValue: this.route.snapshot.paramMap });
  protected readonly tickets = this.ticketService.tickets;
  protected readonly ticketId = computed(() => this.routeParams().get('id'));
  protected readonly ticket = computed(() => {
    const id = this.ticketId();
    return id ? this.ticketService.getById(id) : undefined;
  });
  protected readonly technicians = ['Morgan Ruiz', 'Priya N.', 'Sam Lee'];
  protected readonly selectedTechnician = signal('Morgan Ruiz');
  protected readonly showActions = signal(false);
  protected readonly statusFilter = signal('all');
  protected readonly filteredTickets = computed(() => {
    const filter = this.statusFilter();
    return this.tickets().filter((ticket) => filter === 'all' || ticket.status === filter);
  });

  protected assignTechnician(): void {
    const ticket = this.ticket();
    if (ticket) this.ticketService.assign(ticket.id, this.selectedTechnician());
  }

  protected startWork(): void {
    const ticket = this.ticket();
    if (ticket?.status === TicketStatus.Assigned) this.ticketService.updateStatus(ticket.id, TicketStatus.InProgress);
  }

  protected resolveTicket(): void {
    const ticket = this.ticket();
    if (ticket?.status === TicketStatus.InProgress) this.ticketService.updateStatus(ticket.id, TicketStatus.Resolved);
  }

  protected closeTicket(): void {
    const ticket = this.ticket();
    if (ticket?.status === TicketStatus.Resolved) this.ticketService.updateStatus(ticket.id, TicketStatus.Closed);
    this.showActions.set(false);
  }

  protected statusLabel(status: TicketStatus): string {
    return status === TicketStatus.InProgress ? 'In Progress' : status.charAt(0).toUpperCase() + status.slice(1);
  }

  protected initials(name: string): string {
    return name.split(/\s+/).map((part) => part[0] ?? '').slice(0, 2).join('').toUpperCase();
  }
}
