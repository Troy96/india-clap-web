import { Injectable } from '@angular/core';
import { MyProfile } from './myprofle';
import { BehaviorSubject } from 'rxjs';
import { InputModalComponent } from 'src/app/shared/input-modal/input-modal.component';

@Injectable({
  providedIn: 'root'
})
export class MyprofileEditableService {


  private inputModal = new BehaviorSubject<MyProfile>({
    toShow: false,
    description: '',
    formControls: []
  });

  public inputModal$ = this.inputModal.asObservable();


  constructor() { }

  setInputModal(description, formControls) {
    this.inputModal.next({
      toShow: true,
      description,
      formControls
    })
  }

  closeModal() {
    this.inputModal.next({
      toShow: false,
      description: '',
      formControls: []
    })
  }


}


