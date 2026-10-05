import { Component, computed, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import {
  LucideBell,
  LucideChartNoAxesColumn,
  LucideChevronDown,
  LucideClipboardList,
  LucideLayoutDashboard,
  LucideMenu,
  LucidePlus,
  LucideTickets,
  LucideUserRound,
  LucideUsers,
  LucideWrench,
} from '@lucide/angular';
import { AuthService } from './core/services/auth.service';
import { UserRole } from './shared/enums/user-role.enum';

interface NavigationItem {
  label: string;
  path: string;
  icon: string;
}

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet, RouterLink, RouterLinkActive, LucideBell,
    LucideChartNoAxesColumn, LucideChevronDown, LucideClipboardList,
    LucideLayoutDashboard, LucideMenu, LucidePlus, LucideTickets,
    LucideUserRound, LucideUsers, LucideWrench,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly UserRole = UserRole;
  private readonly router = inject(Router);
  private readonly auth = inject(AuthService);
  private readonly currentUrl = signal(this.router.url);
  protected readonly currentRole = this.auth.currentRole;
  protected readonly userName = this.auth.userName;
  protected readonly sidebarOpen = signal(false);
  protected readonly isLogin = computed(() => this.currentUrl() === '/login');
  protected readonly roleLabel = computed(() => this.currentRole() ?? UserRole.Reporter);
  protected readonly initials = computed(() =>
    this.userName().split(/\s+/).map((part) => part[0] ?? '').slice(0, 2).join('').toUpperCase(),
  );
  protected readonly navItems = computed<NavigationItem[]>(() => {
    switch (this.currentRole()) {
      case UserRole.Technician:
        return [
          { label: 'Dashboard', path: '/technician/dashboard', icon: 'dashboard' },
          { label: 'Assigned tickets', path: '/technician/assigned-tickets', icon: 'tickets' },
          { label: 'Notifications', path: '/technician/notifications', icon: 'notifications' },
        ];
      case UserRole.Admin:
        return [
          { label: 'Admin dashboard', path: '/admin/dashboard', icon: 'dashboard' },
          { label: 'Ticket management', path: '/admin/ticket-management', icon: 'tickets' },
          { label: 'Technicians', path: '/admin/technicians', icon: 'people' },
          { label: 'Reports', path: '/admin/reports', icon: 'reports' },
        ];
      default:
        return [
          { label: 'Dashboard', path: '/reporter/dashboard', icon: 'dashboard' },
          { label: 'Report issue', path: '/reporter/report-issue', icon: 'report' },
          { label: 'My tickets', path: '/reporter/my-tickets', icon: 'tickets' },
          { label: 'Campus feed', path: '/reporter/campus-feed', icon: 'feed' },
          { label: 'Profile', path: '/reporter/profile', icon: 'profile' },
        ];
    }
  });

  constructor() {
    this.router.events.pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event) => this.currentUrl.set(event.urlAfterRedirects));
  }

  protected switchRole(event: Event): void {
    const role = (event.target as HTMLSelectElement).value as UserRole;
    this.auth.setRole(role);
    this.router.navigate([this.dashboardFor(role)]);
  }

  protected signOut(): void {
    this.auth.signOut();
    this.router.navigate(['/login']);
  }

  protected toggleSidebar(): void { this.sidebarOpen.update((open) => !open); }
  protected closeSidebar(): void { this.sidebarOpen.set(false); }

  private dashboardFor(role: UserRole): string {
    if (role === UserRole.Admin) return '/admin/dashboard';
    if (role === UserRole.Technician) return '/technician/dashboard';
    return '/reporter/dashboard';
  }
}
