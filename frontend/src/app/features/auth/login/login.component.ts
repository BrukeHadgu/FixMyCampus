import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LucideLockKeyhole, LucideMail } from '@lucide/angular';
import { AuthService } from '../../../core/services/auth.service';
import { UserRole } from '../../../shared/enums/user-role.enum';

@Component({
  selector: 'app-login',
  imports: [FormsModule, LucideLockKeyhole, LucideMail],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private readonly router = inject(Router);
  private readonly auth = inject(AuthService);

  protected email = '';
  protected password = '';
  protected readonly message = signal('');

  protected signIn(): void {
    const normalizedEmail = this.email.trim().toLowerCase();
    const isAdminDemo = normalizedEmail === 'admin@aau.edu.et';
    const isTechnicianDemo = normalizedEmail === 'technician@aau.edu.et';

    if ((isAdminDemo && this.password !== 'Admin123!') || (isTechnicianDemo && this.password !== 'Tech123!')) {
      this.message.set(`That ${isAdminDemo ? 'admin' : 'technician'} demo password is not correct.`);
      return;
    }

    const role = isAdminDemo ? UserRole.Admin : isTechnicianDemo ? UserRole.Technician : UserRole.Reporter;
    const name = isAdminDemo ? 'Alex Morgan' : isTechnicianDemo ? 'Morgan Ruiz' : normalizedEmail.split('@')[0]
      .split(/[._-]/)
      .filter(Boolean)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ') || 'Jordan Davis';

    this.auth.signIn(role, name);
    const destination = role === UserRole.Admin
      ? '/admin/dashboard'
      : role === UserRole.Technician
        ? '/technician/dashboard'
        : '/reporter/dashboard';
    this.router.navigate([destination]);
  }

  protected requestHelp(): void {
    this.message.set('For account access, contact your campus IT service desk.');
  }
}
