import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthServices } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { MyprofileEditableService } from '../../myprofile-editable.service';
import { CertificateService } from './certificate.service';

@Component({
  selector: 'app-certificate',
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.css']
})
export class CertificateComponent implements OnInit {


  certificateForm: FormGroup
  user_id = JSON.parse(localStorage.getItem('currentUser'))['user_id'];
  constructor(
    private _fb: FormBuilder,
    private _authService: AuthServices,
    private notifService: NotificationService,
    private _myProfile: MyprofileEditableService,
    public _certificate: CertificateService
  ) { }

  ngOnInit() {
    this.certificateForm = this._fb.group({
      certification_name: [''],
      issue_date: [''],
      not_expire: [false],
      expiration_date: [''],
      description: [''],
    })
  }

  onSubmit() {
    if (this.certificateForm.get('not_expire').value) this.certificateForm.removeControl('expiration_date');


    this._authService.add_certificate({
      ...this.certificateForm.value,
      user: this.user_id
    }).subscribe(
      data => {
        this.notifService.showSuccess('Certificate added!', 'Certificate alert');
        this._myProfile.updateUserDetails();
        this._certificate.closeModal();
      })
  }



}
