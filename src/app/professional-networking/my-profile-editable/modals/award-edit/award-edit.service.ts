import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface DataModal {
  show: boolean,
  data: any
}

@Injectable({
  providedIn: 'root'
})
export class AwardEditService {

  constructor() { }

  content = new BehaviorSubject<DataModal>({
    show: false,
    data: null
  })

  content$ = this.content.asObservable();

  openModal(data) {
    this.content.next({
      show: true,
      data
    })
  }

  closeModal() {
    this.content.next({
      show: false,
      data: null
    })
  }
}
