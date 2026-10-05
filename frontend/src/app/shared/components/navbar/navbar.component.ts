import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { User } from '../../models/user.model';

export interface NavbarLink {
  label: string;
  route: string;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  @Input() brand = 'FixMyCampus';
  @Input() links: NavbarLink[] = [];
  @Input() user: User | null = null;
  @Output() signOut = new EventEmitter<void>();
}
