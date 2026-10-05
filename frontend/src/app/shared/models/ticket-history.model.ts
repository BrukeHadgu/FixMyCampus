import { TicketStatus } from '../enums/ticket-status.enum';
import { UserRole } from '../enums/user-role.enum';

export interface TicketHistory {
  id: number;
  ticketId: number;
  fromStatus: TicketStatus | null;
  toStatus: TicketStatus;
  changedById: string;
  changedByRole: UserRole;
  technicianUserId?: string | null;
  createdAt: string;
}
