import { Component, OnInit } from '@angular/core';
import { CertificateEditService } from '../certificate-edit/certificate-edit.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthServices } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { MyprofileEditableService } from '../../myprofile-editable.service';
import { AwardService } from '../award/award.service';
import { AwardEditService } from './award-edit.service';

@Component({
  selector: 'app-award-edit',
  templateUrl: './award-edit.component.html',
  styleUrls: ['./award-edit.component.css']
})
export class AwardEditComponent implements OnInit {

  awardEditForm: FormGroup
  content: any;

  constructor(
    public _awardEdit: AwardEditService,
    private _fb: FormBuilder,
    private _auth: AuthServices,
    private _toast: NotificationService,
    private _myProfile: MyprofileEditableService
  ) { }

  ngOnInit() {
    this._awardEdit.content$
      .subscribe(
        editData => {
          if (!editData) return
          this.content = editData.data;
          this.awardEditForm = this._fb.group({
            title: [editData.data.title],
            issuer: [editData.data.issuer],
            issue_date: [editData.data.issue_date],
            desc: [editData.data.desc],
          })
        }
      )
  }

  async onSave() {
    if (this.awardEditForm.invalid) return;

    try {
      const resp = await this._auth.update_award(this.content.id, {
        ...this.awardEditForm.value,
        userId: JSON.parse(localStorage.getItem('currentUser'))['user_id']
      }).toPromise();

      this._toast.showSuccess('Award details updated!', 'Update alert');
      this._myProfile.updateUserDetails();
      this._awardEdit.closeModal();


    } catch (err) {
      this._myProfile.handleError(err)
    }
  }

  async onDelete() {

    try {
      const resp = await this._auth.delete_awards(this.content.id).toPromise();

      this._toast.showSuccess('Award deleted!', 'Update alert');
      this._myProfile.updateUserDetails();
      this._awardEdit.closeModal();


    } catch (err) {
      this._myProfile.handleError(err)
    }
  }
}
