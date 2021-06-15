import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerServiceService {
  private count = 0;
  private spinner$ = new BehaviorSubject<string>('');
  constructor() { }

  getSpinnerObserver(): Observable<String> {
    return this.spinner$.asObservable();
  }

  requstStarted() {
    if (++this.count === 1) {
      this.spinner$.next('start');
    }
  }
  requestEndned() {
    if (this.count == 0 || --this.count == 0) {
      this.spinner$.next('stop')
    }
  }
  resetSpinner() {
    this.count == 0;
    this.spinner$.next('stop');
  }

}
