import { TicketStatus } from '../enums/ticket-status.enum';

const statusLabels: Record<TicketStatus, string> = {
  [TicketStatus.New]: 'New',
  [TicketStatus.Assigned]: 'Assigned',
  [TicketStatus.InProgress]: 'In progress',
  [TicketStatus.Resolved]: 'Resolved',
};

export function getStatusLabel(status: TicketStatus | number | string): string {
  const parsedStatus = typeof status === 'string' ? Number(status) : status;
  return parsedStatus in statusLabels
    ? statusLabels[parsedStatus as TicketStatus]
    : 'Unknown';
}

export function getStatusClass(status: TicketStatus | number | string): string {
  const normalized = getStatusLabel(status).toLowerCase().replace(/\s+/g, '-');
  return `status-${normalized}`;
}
