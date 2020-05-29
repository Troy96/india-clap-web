import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProjectService } from '../project/project.service';
import { NotificationService } from 'src/app/services/notification.service';
import { AuthServices } from 'src/app/services/auth.service';
import { MyprofileEditableService } from '../../myprofile-editable.service';
import { LanguageService } from './language.service';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.css']
})
export class LanguageComponent implements OnInit {

  languageForm: FormGroup;
  user_id: any;

  constructor(
    private _fb: FormBuilder,
    public _language: LanguageService,
    private notifService: NotificationService,
    private _authService: AuthServices,
    private _myProfile: MyprofileEditableService
  ) {
    this.languageForm = this._fb.group({
      language: [''],
      proficiency: [''],
    })
  }

  ngOnInit() {
    this.user_id = JSON.parse(localStorage.getItem('currentUser'))['user_id'];
  }
  onSubmit() {
    if (this.languageForm.invalid) return;

    this._authService.add_language({
      ...this.languageForm.value,
      user: this.user_id
    }).subscribe(
      data => {
        this.notifService.showSuccess('Language added!', 'alert');
        this._myProfile.updateUserDetails();
        this._language.closeModal();
      }
    )
  }

}
