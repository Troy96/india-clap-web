import { Component, OnInit, Input } from '@angular/core';
import { MyprofileEditableService } from 'src/app/professional-networking/my-profile-editable/myprofile-editable.service';
import { MyProfile } from 'src/app/professional-networking/my-profile-editable/myprofle';

@Component({
  selector: 'app-input-modal',
  templateUrl: './input-modal.component.html',
  styleUrls: ['./input-modal.component.css']
})
export class InputModalComponent implements OnInit {

  inputData: MyProfile

  constructor(
    private myProfileService: MyprofileEditableService
  ) { }

  ngOnInit() {
    this.myProfileService.inputModal$.subscribe(inputData => {
      this.inputData = { ...inputData };
    })
  }

  closeInputModal() {
    this.myProfileService.closeModal();
  }

}
