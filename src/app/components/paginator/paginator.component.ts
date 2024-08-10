import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.css',
})
export class PaginatorComponent {
  @Input() limit!: number;
  @Input() skip!: number;
  @Input() total!: number;

  onNextPage() {}

  onPreviousPage() {}
}
