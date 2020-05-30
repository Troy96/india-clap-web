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
    private _experienceEdit: ExperienceEditService,
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

  onSave() {
    if (this.experienceEditForm.invalid) return
    this._auth.update_experience(this.content.id, {
      ...this.experienceEditForm.value,
      userId: JSON.parse(localStorage.getItem('currentUser'))['user_id']
    })
      .subscribe(res => {
        this._toast.showSuccess('Experience details updated!', 'Update alert');
        this._myProfile.updateUserDetails();
        this._experienceEdit.closeModal();
      })
  }
  onDelete() {
    this._auth.delete_experience(this.content.id).subscribe((data: any) => {
      this._toast.showSuccess('Experience Deleted!', 'Update alert');
      this._myProfile.updateUserDetails();
      this._experienceEdit.closeModal();
    })
  }

}
