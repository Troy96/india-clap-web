import { Component, OnInit, Input } from '@angular/core';
import { MyprofileEditableService } from 'src/app/professional-networking/my-profile-editable/myprofile-editable.service';
import { MyProfile } from 'src/app/professional-networking/my-profile-editable/myprofle';
import { FormBuilder, FormArray, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-input-modal',
  templateUrl: './input-modal.component.html',
  styleUrls: ['./input-modal.component.css']
})
export class InputModalComponent implements OnInit {

  inputForm: FormGroup;

  inputData: MyProfile

  constructor(
    private myProfileService: MyprofileEditableService,
    private fb: FormBuilder,
    private authService: AuthService
  ) {

  }

  ngOnInit() {
    this.myProfileService.inputModal$.subscribe(inputData => {
      this.inputData = { ...inputData };
      this.createDynamicFormControls()
    })
  }

  createDynamicFormControls() {
    switch (this.inputData.description) {
      case 'headline': {
        this.inputForm = this.fb.group({
          profile: this.fb.array([
            this.fb.control('')
          ])
        });
        break;
      }
    }
  }

  onSave(description) {
    switch (description) {
      case 'headline': {
        this.authService.update_user_details(JSON.parse(localStorage.getItem('currentUser'))['user_id'], { brief_Desc: this.inputForm.get('profile').value[0] })
          .subscribe(_ => {
            this.closeInputModal();
            this.authService.get_user_details(JSON.parse(localStorage.getItem('currentUser'))['user_id'])
          })
        break;
      }
    }
  }

  closeInputModal() {
    this.myProfileService.closeModal();
  }

}
