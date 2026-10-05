import { TicketCategory } from '../enums/ticket-category.enum';
import { TicketStatus } from '../enums/ticket-status.enum';
import { Urgency } from '../enums/urgency.enum';

export interface Ticket {
  id: string;
  title: string;
  description: string;
  status: TicketStatus;
  category: TicketCategory;
  urgency: Urgency;
  reporterId: string;
  reporterName?: string;
  building?: string;
  location?: string;
  assignedTechnicianId?: string;
  assigneeName?: string;
  createdAt: string;
}