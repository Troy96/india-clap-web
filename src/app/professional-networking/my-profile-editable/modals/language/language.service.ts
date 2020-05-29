import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface DataModal {
  show: boolean,
}

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  content = new BehaviorSubject<DataModal>({
    show: false,
  })

  content$ = this.content.asObservable();

  constructor() { }

  openModal() {
    this.content.next({
      show: true,
    })
  }

  closeModal() {
    this.content.next({
      show: false,
    })
  }
}
