import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ContactModal {
  show: boolean;
  data: any
}

@Injectable({
  providedIn: 'root'
})
export class ContactInfoService {

  private content = new BehaviorSubject<ContactModal>({
    show: false,
    data: null
  });
  public content$ = this.content.asObservable();

  constructor() { }

  openContactInfo(data) {
    this.content.next({
      show: true,
      data: data
    })
  }

  closeContactInfo() {
    this.content.next({
      show: false,
      data: null
    })
  }
  
}
