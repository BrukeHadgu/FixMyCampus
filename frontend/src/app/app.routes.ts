import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { DashboardComponent } from './features/reporter/dashboard/dashboard.component';
import { ReportIssueComponent } from './features/reporter/report-issue/report-issue.component';
import { CampusFeedComponent } from './features/reporter/campus-feed/campus-feed.component';
import { MyTicketsComponent } from './features/reporter/my-tickets/my-tickets.component';
import { ProfileComponent } from './features/reporter/profile/profile.component';
import { TicketDetailsComponent } from './features/tickets/ticket-details/ticket-details.component';
import { DashboardComponent as TechnicianDashboardComponent } from './features/technician/dashboard/dashboard.component';
import { NotificationsComponent } from './features/technician/notifications/notifications.component';
import { AssignedTicketsComponent } from './features/technician/assigned-tickets/assigned-tickets.component';
import { TicketDetailsComponent as TechnicianTicketDetailsComponent } from './features/technician/ticket-details/ticket-details.component';
import { DashboardComponent as AdminDashboardComponent } from './features/admin/dashboard/dashboard.component';
import { TicketManagementComponent } from './features/admin/ticket-management/ticket-management.component';
import { AssignTechnicianComponent } from './features/admin/assign-technician/assign-technician.component';
import { TechniciansComponent } from './features/admin/technicians/technicians.component';
import { ReportsComponent } from './features/admin/reports/reports.component';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';
import { UserRole } from './shared/enums/user-role.enum';

export const routes: Routes = [
	{ path: 'login', component: LoginComponent },
	{ path: 'reporter/dashboard', component: DashboardComponent, canActivate: [authGuard, roleGuard], data: { role: UserRole.Reporter } },
	{ path: 'reporter/report-issue', component: ReportIssueComponent, canActivate: [authGuard, roleGuard], data: { role: UserRole.Reporter } },
	{ path: 'reporter/campus-feed', component: CampusFeedComponent, canActivate: [authGuard, roleGuard], data: { role: UserRole.Reporter } },
	{ path: 'reporter/my-tickets', component: MyTicketsComponent, canActivate: [authGuard, roleGuard], data: { role: UserRole.Reporter } },
	{ path: 'reporter/profile', component: ProfileComponent, canActivate: [authGuard, roleGuard], data: { role: UserRole.Reporter } },
	{ path: 'tickets/:id', component: TicketDetailsComponent, canActivate: [authGuard] },
	{ path: 'technician/dashboard', component: TechnicianDashboardComponent, canActivate: [authGuard, roleGuard], data: { role: UserRole.Technician } },
	{ path: 'technician/notifications', component: NotificationsComponent, canActivate: [authGuard, roleGuard], data: { role: UserRole.Technician } },
	{ path: 'technician/assigned-tickets', component: AssignedTicketsComponent, canActivate: [authGuard, roleGuard], data: { role: UserRole.Technician } },
	{ path: 'technician/tickets/:id', component: TechnicianTicketDetailsComponent, canActivate: [authGuard, roleGuard], data: { role: UserRole.Technician } },
	{ path: 'admin/dashboard', component: AdminDashboardComponent, canActivate: [authGuard, roleGuard], data: { role: UserRole.Admin } },
	{ path: 'admin/ticket-management', component: TicketManagementComponent, canActivate: [authGuard, roleGuard], data: { role: UserRole.Admin } },
	{ path: 'admin/assign-technician/:id', component: AssignTechnicianComponent, canActivate: [authGuard, roleGuard], data: { role: UserRole.Admin } },
	{ path: 'admin/technicians', component: TechniciansComponent, canActivate: [authGuard, roleGuard], data: { role: UserRole.Admin } },
	{ path: 'admin/reports', component: ReportsComponent, canActivate: [authGuard, roleGuard], data: { role: UserRole.Admin } },
	{ path: '', pathMatch: 'full', redirectTo: 'login' },
	{ path: '**', redirectTo: 'login' },
];
