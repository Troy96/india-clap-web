import { Component, OnInit } from '@angular/core';
import { EducationEditService } from './education-edit.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthServices } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { MyprofileEditableService } from '../../myprofile-editable.service';
@Component({
  selector: 'app-education-edit',
  templateUrl: './education-edit.component.html',
  styleUrls: ['./education-edit.component.css']
})
export class EducationEditComponent implements OnInit {

  educationEditForm: FormGroup
  content: any;

  constructor(
    private _educationEdit: EducationEditService,
    private _fb: FormBuilder,
    private _auth: AuthServices,
    private _toast: NotificationService,
    private _myProfile: MyprofileEditableService
  ) { }

  ngOnInit() {
    this._educationEdit.content$
      .subscribe(
       (editData:any) => {
          if (!editData) return
          this.content = editData.data;
          console.log(editData)
          this.educationEditForm = this._fb.group({
            // certification_name: [editData.data.certification_name],
            // issue_date: [editData.data.issue_date],
            // not_expire: [editData.data.not_expire],
            // expiration_date: [editData.data.expiration_date],
            // description: [editData.data.description],
            institute: [editData.data.institute],
            degree: [editData.data.degree],
            is_present:[editData.data.is_present],
            study_field: [editData.data.study_field],
            start_year: [editData.data.start_year],
            end_year: [editData.data.end_year],
            grade:[editData.data.grade],
            link:[editData.data.link],
            desc:[editData.data.desc],
      
          })
        }
      )
  }

  onSave() {
    if (this.educationEditForm.invalid) return
    this._auth.update_education(this.content.id, {
      ...this.educationEditForm.value,
      userId: JSON.parse(localStorage.getItem('currentUser'))['user_id']
    })
      .subscribe(res => {
        this._toast.showSuccess('Education details updated!', 'Update alert');
        this._myProfile.updateUserDetails();
        this._educationEdit.closeModal();
      },err=>{
        console.log(err)
      })
  }
 
}
