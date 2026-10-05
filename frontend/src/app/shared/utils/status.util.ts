import { TicketStatus } from '../enums/ticket-status.enum';

export function getTicketStatusLabel(status: TicketStatus): string {
  return status
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}