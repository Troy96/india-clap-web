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
  currentUserId: number;
  inputData: MyProfile
  labels: string[];

  constructor(
    private myProfileService: MyprofileEditableService,
    private fb: FormBuilder,
    private authService: AuthService
  ) {

  }

  ngOnInit() {
    this.currentUserId = JSON.parse(localStorage.getItem('currentUser'))['user_id'];
    this.myProfileService.inputModal$.subscribe(inputData => {
      this.inputData = { ...inputData };
      this.createDynamicFormControls()
    })
  }

  createDynamicFormControls() {
    switch (this.inputData.description) {
      case 'Headline': {
        this.inputForm = this.fb.group({
          profile: this.fb.array([
            this.fb.control('')
          ])
        });
      }
        break;
      case 'Certifications': {
        this.inputForm = this.fb.group({
          profile: this.fb.array([
            this.fb.control('')
          ])
        });
        break;
      }
      case 'Skills': {
        this.labels = ['Skill', 'Level']
        this.inputForm = this.fb.group({
          profile: this.fb.array([
            this.fb.control(''),
            this.fb.control('')
          ])
        });
      }
        break;
    }
  }

  onSave(description) {
    switch (description) {
      case 'Headline': {
        this.authService.update_user_details(this.currentUserId, { brief_Desc: this.inputForm.get('profile').value[0] })
          .subscribe(_ => {
            this.closeInputModal();
          })
      }
        break;
      case 'Certifications': {
        this.authService.add_certificate({
          certification_name: this.inputForm.get('profile').value[0],
          user: this.currentUserId
        }).subscribe(_ => {
          this.closeInputModal();
        })
        break;
      }
      case 'Skills': {
        this.authService.add_skill({
          skill: this.inputForm.get('profile').value[0],
          level: this.inputForm.get('profile').value[1],
          user: this.currentUserId
        }).subscribe(_ => {
          this.closeInputModal();
        })
        break;
      }
    }
  }

  closeInputModal() {
    this.myProfileService.closeModal();
  }

}
