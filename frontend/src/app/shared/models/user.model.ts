import { UserRole } from '../enums/user-role.enum';

export interface User {
  id: string;
  fullName: string;
  email: string;
  role: UserRole;
  code?: string;
  isActive: boolean;
  createdAt?: string;
}
