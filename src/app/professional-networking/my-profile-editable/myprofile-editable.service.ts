import { Injectable } from '@angular/core';
import { MyProfile } from './myprofle';
import { BehaviorSubject } from 'rxjs';
import { InputModalComponent } from 'src/app/shared/input-modal/input-modal.component';
import { NotificationService } from 'src/app/services/notification.service';

@Injectable({
  providedIn: 'root'
})
export class MyprofileEditableService {


  private inputModal = new BehaviorSubject<MyProfile>({
    toShow: false,
    description: '',
    isInputForm: true,
    data: null
  });

  private toRefreshUserDetails = new BehaviorSubject<boolean>(false);
  public toRefreshDetails$ = this.toRefreshUserDetails.asObservable();

  public inputModal$ = this.inputModal.asObservable();


  constructor(
    private notifService: NotificationService
  ) { }

  setInputModal(description, isInputForm, data) {
    this.inputModal.next({
      toShow: true,
      description,
      isInputForm,
      data
    })
  }

  closeModal() {
    this.inputModal.next({
      toShow: false,
      description: '',
      isInputForm: true,
      data: null
    })
  }

  updateUserDetails() {
    this.toRefreshUserDetails.next(true);
  }

  handleError(err) {
    for (let obj in err.error) {
      const error = err.error[obj];
      this.notifService.showError(error, obj);
    }
  }


}


