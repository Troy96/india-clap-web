import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { EducationEditService } from '../education-edit/education-edit.service';
import { AuthServices } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { MyprofileEditableService } from '../../myprofile-editable.service';
import { ExperienceEditService } from './experience-edit.service';

@Component({
  selector: 'app-experience-edit',
  templateUrl: './experience-edit.component.html',
  styleUrls: ['./experience-edit.component.css']
})
export class ExperienceEditComponent implements OnInit {

  experienceEditForm: FormGroup
  content: any;

  constructor(
    public _experienceEdit: ExperienceEditService,
    private _fb: FormBuilder,
    private _auth: AuthServices,
    private _toast: NotificationService,
    private _myProfile: MyprofileEditableService
  ) { }

  ngOnInit() {
    this._experienceEdit.content$
      .subscribe(
        editData => {
          if (!editData) return
          this.content = editData.data;
          this.experienceEditForm = this._fb.group({
            company_name: [editData.data.company_name],
            start_date: [editData.data.start_date],
            end_date: [editData.data.end_date],
            is_present: [editData.data.is_present],
            title: [editData.data.title],
            responsibilities: [editData.data.responsibilities]
          })
        }
      )
  }

  async onSave() {
    if (this.experienceEditForm.invalid) return;

    try {
      const resp = await this._auth.update_experience(this.content.id, {
        ...this.experienceEditForm.value,
        userId: JSON.parse(localStorage.getItem('currentUser'))['user_id']
      }).toPromise();

      this._toast.showSuccess('Experience details updated!', 'Update alert');
      this._myProfile.updateUserDetails();
      this._experienceEdit.closeModal();
    } catch (err) {
      this._myProfile.handleError(err)
    }
  }

  async onDelete() {
    try {
      const resp = await this._auth.delete_experience(this.content.id).toPromise();

      this._toast.showSuccess('Experience Deleted!', 'Update alert');
      this._myProfile.updateUserDetails();
      this._experienceEdit.closeModal();
    } catch (err) {
      this._myProfile.handleError(err)
    }
  }

}
