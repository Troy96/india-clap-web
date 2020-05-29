import { Component, OnInit } from '@angular/core';
import { CertificateEditService } from './certificate-edit.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthServices } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { MyprofileEditableService } from '../../myprofile-editable.service';

@Component({
  selector: 'app-certificate-edit',
  templateUrl: './certificate-edit.component.html',
  styleUrls: ['./certificate-edit.component.css']
})
export class CertificateEditComponent implements OnInit {

  certificateEditForm: FormGroup
  content: any;

  constructor(
    private _certificateEdit: CertificateEditService,
    private _fb: FormBuilder,
    private _auth: AuthServices,
    private _toast: NotificationService,
    private _myProfile: MyprofileEditableService
  ) { }

  ngOnInit() {
    this._certificateEdit.content$
      .subscribe(
        editData => {
          if (!editData) return
          this.content = editData.data;
          this.certificateEditForm = this._fb.group({
            certification_name: [editData.data.certification_name],
            issue_date: [editData.data.issue_date],
            not_expire: [editData.data.not_expire],
            expiration_date: [editData.data.expiration_date],
            description: [editData.data.description]
          })
        }
      )
  }

  onSave() {
    if (this.certificateEditForm.invalid) return
    this._auth.update_certificate(this.content.id, {
      ...this.certificateEditForm.value,
      userId: JSON.parse(localStorage.getItem('currentUser'))['user_id']
    })
      .subscribe(res => {
        this._toast.showSuccess('Certificate details updated!', 'Update alert');
        this._myProfile.updateUserDetails();
        this._certificateEdit.closeModal();
      })
  }

}
