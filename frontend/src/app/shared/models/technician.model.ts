import { User } from './user.model';

export interface Technician extends User {
  role: import('../enums/user-role.enum').UserRole.Technician;
  assignedTicketCount?: number;
}
