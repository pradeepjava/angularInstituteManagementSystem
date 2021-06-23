import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseeditsubjectService {
  private source = new BehaviorSubject(false);
  currentMessage = this.source.asObservable();
  constructor() { }
  changeMessage(b: boolean) {
    this.source.next(b);
  }
}
