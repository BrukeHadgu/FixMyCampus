import { Injectable, computed, signal } from '@angular/core';
import { TicketCategory } from '../../shared/enums/ticket-category.enum';
import { TicketStatus } from '../../shared/enums/ticket-status.enum';
import { Urgency } from '../../shared/enums/urgency.enum';
import { Ticket } from '../../shared/models/ticket.model';

@Injectable({ providedIn: 'root' })
export class TicketService {
	private readonly ticketState = signal<Ticket[]>([
		{ id: 'FMC-1048', title: 'Water fountain leaking', description: 'The water fountain beside Room 218 is leaking continuously. Water is pooling on the floor and creating a slip hazard.', status: TicketStatus.InProgress, category: TicketCategory.Plumbing, urgency: Urgency.Medium, reporterId: 'reporter-1', reporterName: 'Taylor Kim', building: 'Student Center', location: 'Level 2 — East hallway', assigneeName: 'Morgan Ruiz', createdAt: '2026-10-05T09:12:00' },
		{ id: 'FMC-1044', title: 'Projector not powering on', description: 'The projector in Science Hall Room 204 does not power on.', status: TicketStatus.Assigned, category: TicketCategory.Technology, urgency: Urgency.Medium, reporterId: 'reporter-2', reporterName: 'Jordan Davis', building: 'Science Hall', location: 'Room 204', assigneeName: 'Priya N.', createdAt: '2026-10-04T11:00:00' },
		{ id: 'FMC-1039', title: 'Broken desk in study room', description: 'One of the desks in the quiet study room has a loose leg.', status: TicketStatus.Resolved, category: TicketCategory.Facilities, urgency: Urgency.Low, reporterId: 'reporter-3', reporterName: 'Mina Tesfaye', building: 'Main Library', location: 'Study 4B', assigneeName: 'Sam Lee', createdAt: '2026-10-02T08:40:00' },
		{ id: 'FMC-1031', title: 'Flickering corridor light', description: 'The light flickers in the east corridor after sunset.', status: TicketStatus.Open, category: TicketCategory.Electrical, urgency: Urgency.Medium, reporterId: 'reporter-1', reporterName: 'Taylor Kim', building: 'Arts Building', location: 'East corridor', createdAt: '2026-10-01T13:30:00' },
		{ id: 'FMC-1025', title: 'Loose tile near entrance', description: 'A floor tile is loose near the north entrance.', status: TicketStatus.Resolved, category: TicketCategory.Facilities, urgency: Urgency.Low, reporterId: 'reporter-4', reporterName: 'Abel Bekele', building: 'Recreation Center', location: 'Main lobby', assigneeName: 'Sam Lee', createdAt: '2026-09-27T15:00:00' },
		{ id: 'FMC-1018', title: 'Air conditioning too warm', description: 'The room is warmer than usual during afternoon classes.', status: TicketStatus.InProgress, category: TicketCategory.Facilities, urgency: Urgency.Medium, reporterId: 'reporter-2', reporterName: 'Jordan Davis', building: 'Business School', location: 'Room 112', assigneeName: 'Priya N.', createdAt: '2026-09-22T10:20:00' },
		{ id: 'FMC-1014', title: 'Water pressure is low', description: 'Low water pressure in the west residence washroom.', status: TicketStatus.Resolved, category: TicketCategory.Plumbing, urgency: Urgency.Low, reporterId: 'reporter-5', reporterName: 'Liya Worku', building: 'West Residence', location: 'Floor 3', assigneeName: 'Sam Lee', createdAt: '2026-09-18T07:30:00' },
		{ id: 'FMC-1052', title: 'Automatic door not opening', description: 'The automatic door does not open when the accessibility button is pressed.', status: TicketStatus.Open, category: TicketCategory.Facilities, urgency: Urgency.High, reporterId: 'reporter-3', reporterName: 'Mina Tesfaye', building: 'Main Library', location: 'North entrance', createdAt: '2026-10-05T09:42:00' },
	]);

	readonly tickets = this.ticketState.asReadonly();
	readonly openCount = computed(() => this.ticketState().filter((ticket) => ticket.status === TicketStatus.Open).length);
	readonly resolvedCount = computed(() => this.ticketState().filter((ticket) => ticket.status === TicketStatus.Resolved).length);

	getById(id: string): Ticket | undefined { return this.ticketState().find((ticket) => ticket.id === id); }

	create(ticket: Omit<Ticket, 'id' | 'createdAt'>): Ticket {
		const nextNumber = Math.max(...this.ticketState().map((item) => Number(item.id.split('-')[1]))) + 1;
		const created: Ticket = { ...ticket, id: `FMC-${nextNumber}`, createdAt: new Date().toISOString() };
		this.ticketState.update((items) => [created, ...items]);
		return created;
	}

	updateStatus(id: string, status: TicketStatus): void {
		this.ticketState.update((items) => items.map((ticket) => ticket.id === id ? { ...ticket, status } : ticket));
	}

	assign(id: string, technician: string): void {
		this.ticketState.update((items) => items.map((ticket) => ticket.id === id ? { ...ticket, assigneeName: technician, status: TicketStatus.Assigned } : ticket));
	}
}