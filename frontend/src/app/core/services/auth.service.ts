import { Injectable, signal } from '@angular/core';
import { UserRole } from '../../shared/enums/user-role.enum';

@Injectable({ providedIn: 'root' })
export class AuthService {
  readonly currentRole = signal<UserRole | null>(this.readRole());
  readonly userName = signal(this.readName());

  isAuthenticated(): boolean {
    return this.currentRole() !== null;
  }

  hasRole(role: UserRole): boolean {
    return this.currentRole() === role;
  }

  signIn(role: UserRole, name: string): void {
    this.currentRole.set(role);
    this.userName.set(name);
    localStorage.setItem('fixmycampus-role', role);
    localStorage.setItem('fixmycampus-name', name);
  }

  setRole(role: UserRole): void {
    this.currentRole.set(role);
    localStorage.setItem('fixmycampus-role', role);
  }

  signOut(): void {
    this.currentRole.set(null);
    localStorage.removeItem('fixmycampus-role');
  }

  private readRole(): UserRole | null {
    const role = typeof localStorage === 'undefined' ? null : localStorage.getItem('fixmycampus-role');
    return Object.values(UserRole).includes(role as UserRole) ? role as UserRole : null;
  }

  private readName(): string {
    return typeof localStorage === 'undefined' ? 'Jordan Davis' : localStorage.getItem('fixmycampus-name') ?? 'Jordan Davis';
  }
}