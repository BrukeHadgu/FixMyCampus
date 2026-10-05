import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LucideChevronDown, LucideSend } from '@lucide/angular';
import { AuthService } from '../../../core/services/auth.service';
import { TicketService } from '../../../core/services/ticket.service';
import { TicketCategory } from '../../../shared/enums/ticket-category.enum';
import { TicketStatus } from '../../../shared/enums/ticket-status.enum';
import { Urgency } from '../../../shared/enums/urgency.enum';

interface CategoryOption {
  value: TicketCategory;
  label: string;
}

interface BuildingOption {
  value: string;
  label: string;
}

@Component({
  selector: 'app-report-issue',
  imports: [FormsModule, RouterLink, LucideChevronDown, LucideSend],
  templateUrl: './report-issue.component.html',
  styleUrl: './report-issue.component.scss',
})
export class ReportIssueComponent {
  private readonly ticketService = inject(TicketService);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  protected readonly categories: CategoryOption[] = [
    { value: TicketCategory.Facilities, label: 'Facilities' },
    { value: TicketCategory.Cleaning, label: 'Cleaning' },
    { value: TicketCategory.Electrical, label: 'Electrical' },
    { value: TicketCategory.Plumbing, label: 'Plumbing' },
    { value: TicketCategory.Technology, label: 'Technology' },
    { value: TicketCategory.Other, label: 'Other' },
  ];
  protected readonly buildings: BuildingOption[] = [
    { value: 'Student Center', label: 'Student Center' },
    { value: 'Main Library', label: 'Main Library' },
    { value: 'Science Hall', label: 'Science Hall' },
    { value: 'Arts Building', label: 'Arts Building' },
    { value: 'Business School', label: 'Business School' },
    { value: 'Recreation Center', label: 'Recreation Center' },
    { value: 'West Residence', label: 'West Residence' },
  ];

  protected category = TicketCategory.Facilities;
  protected building = '';
  protected location = '';
  protected description = '';

  protected submitReport(): void {
    const trimmedDescription = this.description.trim();
    const title = trimmedDescription.split(/[.!?]/, 1)[0].slice(0, 72) || `${this.category} issue`;
    const ticket = this.ticketService.create({
      title,
      description: trimmedDescription,
      status: TicketStatus.Open,
      category: this.category,
      urgency: Urgency.Medium,
      reporterId: 'reporter-demo',
      reporterName: this.auth.userName(),
      building: this.building,
      location: this.location.trim(),
    });

    this.router.navigate(['/tickets', ticket.id]);
  }
}
