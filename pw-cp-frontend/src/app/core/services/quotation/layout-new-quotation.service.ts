import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LayoutNewQuotationService {

  public stateNavigation = new BehaviorSubject(false);
  state = this.stateNavigation.asObservable();

  constructor() { }

}
