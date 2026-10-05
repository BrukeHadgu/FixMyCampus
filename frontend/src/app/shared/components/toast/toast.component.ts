import { Component, EventEmitter, Input, Output } from '@angular/core';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

@Component({
  selector: 'app-toast',
  standalone: true,
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
})
export class ToastComponent {
  @Input() message = '';
  @Input() type: ToastType = 'info';
  @Input() visible = true;
  @Output() dismissed = new EventEmitter<void>();
}
