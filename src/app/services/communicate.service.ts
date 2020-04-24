import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommunicateService {

  private userList = new BehaviorSubject<any[]>([]);
  public userList$ = this.userList.asObservable();

  constructor() { }

  public setUserList(users: any[]) {
    this.userList.next(users);
  }

  jobList = [];

}
