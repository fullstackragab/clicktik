import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.css',
})
export class PaginatorComponent implements OnInit {
  @Input() limit!: number;
  @Input() skip!: number;
  @Input() total!: number;
  pages = new Array(0);
  currentPage = 0;

  @Output() paginate = new EventEmitter<number>();

  ngOnInit(): void {
    if (this.total > 0 && this.limit > 0) {
      this.pages =
        this.total % this.limit == 0
          ? new Array(Math.floor(this.total / this.limit))
          : new Array(Math.floor(this.total / this.limit) + 1);
    }
  }

  onNext() {
    this.paginate.next(this.currentPage + 1);
  }

  onPrevious() {
    this.paginate.next(this.currentPage - 1);
  }

  onPage(i: any) {
    this.currentPage = i;
    this.paginate.next(this.currentPage);
  }
}
