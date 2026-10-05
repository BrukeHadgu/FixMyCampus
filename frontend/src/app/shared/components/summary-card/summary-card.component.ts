import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-summary-card',
  standalone: true,
  templateUrl: './summary-card.component.html',
  styleUrl: './summary-card.component.scss',
})
export class SummaryCardComponent {
  @Input({ required: true }) title = '';
  @Input({ required: true }) value: string | number = '';
  @Input() detail = '';
  @Input() icon = '';
}
