import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideArrowUpRight, LucideCalendarDays, LucideChevronDown, LucideCircleCheck, LucideClipboardList, LucideDownload, LucideSlidersHorizontal, LucideTicket, LucideUsers, LucideWrench } from '@lucide/angular';
import { TicketService } from '../../../core/services/ticket.service';
import { TicketStatus } from '../../../shared/enums/ticket-status.enum';
import { getTicketStatusLabel } from '../../../shared/utils/status.util';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink, LucideArrowUpRight, LucideCalendarDays, LucideChevronDown, LucideCircleCheck, LucideClipboardList, LucideDownload, LucideSlidersHorizontal, LucideTicket, LucideUsers, LucideWrench],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  private readonly ticketService = inject(TicketService);

  protected readonly TicketStatus = TicketStatus;
  protected readonly buildingFilter = signal('All buildings');
  protected readonly sortOrder = signal('Newest first');
  protected readonly tickets = this.ticketService.tickets;
  protected readonly resolvedCount = this.ticketService.resolvedCount;
  protected readonly newCount = this.ticketService.openCount;
  protected readonly inProgressCount = computed(() => this.tickets().filter((ticket) => ticket.status === TicketStatus.InProgress).length);
  protected readonly assignedCount = computed(() => this.tickets().filter((ticket) => ticket.status === TicketStatus.Assigned).length);
  protected readonly openWork = computed(() => {
    const direction = this.sortOrder() === 'Newest first' ? -1 : 1;
    return this.tickets()
      .filter((ticket) => ticket.status !== TicketStatus.Resolved && ticket.status !== TicketStatus.Closed)
      .filter((ticket) => this.buildingFilter() === 'All buildings' || ticket.building === this.buildingFilter())
      .sort((first, second) => direction * (Date.parse(first.createdAt) - Date.parse(second.createdAt)));
  });
  protected readonly buildings = computed(() => ['All buildings', ...new Set(this.tickets().map((ticket) => ticket.building).filter((building): building is string => Boolean(building)))]);
  protected readonly statusLabel = getTicketStatusLabel;

  protected ageLabel(createdAt: string): string {
    const elapsedMinutes = Math.max(1, Math.floor((Date.now() - Date.parse(createdAt)) / 60_000));
    if (elapsedMinutes < 60) return `${elapsedMinutes}m`;
    const hours = Math.floor(elapsedMinutes / 60);
    return hours < 24 ? `${hours}h` : `${Math.floor(hours / 24)}d`;
  }

  protected exportCsv(): void {
    const rows = [
      ['Ticket', 'Issue', 'Building', 'Urgency', 'Status', 'Assignee', 'Created'],
      ...this.openWork().map((ticket) => [ticket.id, ticket.title, ticket.building ?? '', ticket.urgency, this.statusLabel(ticket.status), ticket.assigneeName ?? 'Unassigned', ticket.createdAt]),
    ];
    const csv = rows.map((row) => row.map((cell) => `"${cell.replaceAll('"', '""')}"`).join(',')).join('\r\n');
    const file = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(file);
    link.download = 'fixmycampus-open-tickets.csv';
    link.click();
    URL.revokeObjectURL(link.href);
  }
}
