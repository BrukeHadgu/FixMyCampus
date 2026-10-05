import { DatePipe, TitleCasePipe } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { LucideArrowLeft, LucideCircleCheck, LucideWrench } from '@lucide/angular';
import { TicketService } from '../../../core/services/ticket.service';
import { TicketStatus } from '../../../shared/enums/ticket-status.enum';
import { getTicketStatusLabel } from '../../../shared/utils/status.util';

@Component({
  selector: 'app-ticket-details',
  imports: [DatePipe, TitleCasePipe, RouterLink, LucideArrowLeft, LucideCircleCheck, LucideWrench],
  templateUrl: './ticket-details.component.html',
  styleUrl: './ticket-details.component.scss',
})
export class TicketDetailsComponent {
  protected readonly TicketStatus = TicketStatus;
  private readonly route = inject(ActivatedRoute);
  private readonly ticketService = inject(TicketService);
  private readonly routeParams = toSignal(this.route.paramMap, { initialValue: this.route.snapshot.paramMap });
  protected readonly ticket = computed(() => this.ticketService.getById(this.routeParams().get('id') ?? ''));
  protected readonly stages = ['New', 'Assigned', 'In Progress', 'Resolved'];
  protected readonly currentStage = computed(() => {
    const status = this.ticket()?.status;
    if (status === TicketStatus.Assigned) return 1;
    if (status === TicketStatus.InProgress) return 2;
    if (status === TicketStatus.Resolved || status === TicketStatus.Closed) return 3;
    return 0;
  });

  protected statusLabel(status: TicketStatus): string {
    return status === TicketStatus.Open ? 'New' : getTicketStatusLabel(status);
  }
}
