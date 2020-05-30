import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AwardEditService } from '../award-edit/award-edit.service';
import { AuthServices } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { MyprofileEditableService } from '../../myprofile-editable.service';
import { AboutEditService } from './about-edit.service';

@Component({
  selector: 'app-about-edit',
  templateUrl: './about-edit.component.html',
  styleUrls: ['./about-edit.component.css']
})
export class AboutEditComponent implements OnInit {

  aboutEditForm: FormGroup
  content: any;

  constructor(
    public _aboutEdit: AboutEditService,
    private _fb: FormBuilder,
    private _auth: AuthServices,
    private _toast: NotificationService,
    private _myProfile: MyprofileEditableService
  ) { }

  ngOnInit() {
    this._aboutEdit.content$
      .subscribe(
        editData => {
          if (!editData) return
          this.content = editData.data;
          this.aboutEditForm = this._fb.group({
            brief_Desc: [editData.data.brief_Desc],
          })
        }
      )
  }

  onSave() {
    if (this.aboutEditForm.invalid) return
    this._auth.update_user_details(this.content.id, {
      ...this.aboutEditForm.value,
      userId: JSON.parse(localStorage.getItem('currentUser'))['user_id']
    })
      .subscribe(res => {
        this._toast.showSuccess('About details updated!', 'Update alert');
        this._myProfile.updateUserDetails();
        this._aboutEdit.closeModal();
      }, err => {
        this._toast.showError(err.error.brief_Desc[0], 'Error alert')
      })
  }

}
