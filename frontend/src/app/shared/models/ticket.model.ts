import { TicketStatus } from '../enums/ticket-status.enum';
import { Urgency } from '../enums/urgency.enum';

export interface TicketCategoryDetails {
  id: number;
  name: string;
  code?: string;
}

export interface TicketLocation {
  id: number;
  name?: string;
  code?: string;
  number?: string;
}

export interface Ticket {
  id: number;
  ticketNumber: number;
  code?: string;
  reporterId: string;
  categoryId: number;
  category?: TicketCategoryDetails;
  buildingId: number;
  building?: TicketLocation;
  roomId: number;
  room?: TicketLocation;
  description: string;
  priority: Urgency;
  status: TicketStatus;
  technicianUserId?: string | null;
  reporterConfirmed: boolean;
  createdAt: string;
  updatedAt: string;
  resolvedAt?: string | null;
}
