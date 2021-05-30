import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  public stateRouteFile = new BehaviorSubject(false);
  pathFile = this.stateRouteFile.asObservable();

  constructor() { }

}
