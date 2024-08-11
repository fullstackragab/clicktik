import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  term = new BehaviorSubject<string>('');
  constructor() {}

  search(q: string) {
    this.term.next(q);
  }
}
