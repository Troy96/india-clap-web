import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthServices } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { MyprofileEditableService } from '../../myprofile-editable.service';
import { CertificateService } from '../certificate/certificate.service';
import { AwardService } from './award.service';

@Component({
  selector: 'app-award',
  templateUrl: './award.component.html',
  styleUrls: ['./award.component.css']
})
export class AwardComponent implements OnInit {

  awardForm: FormGroup
  user_id = JSON.parse(localStorage.getItem('currentUser'))['user_id'];

  constructor(
    private _fb: FormBuilder,
    private _authService: AuthServices,
    private notifService: NotificationService,
    private _myProfile: MyprofileEditableService,
    public _award: AwardService
  ) { }

  ngOnInit() {
    this.awardForm = this._fb.group({
      title: [''],
      issuer: [''],
      issue_time: [''],
      desc: [''],
    })
  }

  onSubmit() {
    if(this.awardForm.invalid) return;

    this._authService.add_award({
      ...this.awardForm.value,
      user: this.user_id
    }).subscribe(
      data => {
        this.notifService.showSuccess('Award added!', 'add alert');
        this._myProfile.updateUserDetails();
        this._award.closeModal();
      })
  }


}
