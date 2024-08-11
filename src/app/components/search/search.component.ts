import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent {
  constructor(
    private readonly router: Router,
    private readonly searchService: SearchService
  ) {}

  onSearch(q: string) {
    this.searchService.term.next(q);
    this.router.navigateByUrl('/search');
  }
}
