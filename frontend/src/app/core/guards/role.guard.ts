import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { UserRole } from '../../shared/enums/user-role.enum';
import { AuthService } from '../services/auth.service';

export const roleGuard: CanActivateFn = (route) => {
  const requiredRole = route.data['role'] as UserRole | undefined;
  return requiredRole !== undefined && inject(AuthService).hasRole(requiredRole);
};