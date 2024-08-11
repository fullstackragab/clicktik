import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor() {}

  roundNumber(v: number) {
    return Math.round((v + Number.EPSILON) * 100) / 100;
  }
}
