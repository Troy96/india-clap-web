import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  refreshUser = new BehaviorSubject<any>('');
  refreshUser$ = this.refreshUser.asObservable();

  constructor() { }

  refreshUserDetails() {
    this.refreshUser.next(true);
  }

}
