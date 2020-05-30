import { Component, OnInit } from '@angular/core';
import { ProjectEditService } from './project-edit.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthServices } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { NotificationService } from 'src/app/services/notification.service';
import { MyprofileEditableService } from '../../myprofile-editable.service';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css']
})
export class ProjectEditComponent implements OnInit {

  projectEditForm: FormGroup
  content: any;

  constructor(
    public _projectEdit: ProjectEditService,
    private _fb: FormBuilder,
    private _auth: AuthServices,
    private _toast: NotificationService,
    private _myProfile: MyprofileEditableService
  ) { }

  ngOnInit() {
    this._projectEdit.content$
      .subscribe(
        editData => {
          if (!editData) return
          this.content = editData.data;
          this.projectEditForm = this._fb.group({
            project_name: [editData.data.project_name],
            start_date: [editData.data.start_date],
            end_date: [editData.data.end_date],
            description: [editData.data.description],
            link: [editData.data.link]
          })
        }
      )
  }

  onSave() {
    if (this.projectEditForm.invalid) return
    this._auth.update_project(this.content.id, {
      ...this.projectEditForm.value,
      userId: JSON.parse(localStorage.getItem('currentUser'))['user_id']
    })
      .subscribe(res => {
        this._toast.showSuccess('Project details updated!', 'Update alert');
        this._myProfile.updateUserDetails();
        this._projectEdit.closeModal();
      })
  }
  onDelete(){
    this._auth.delete_project((data:any)=>{
      this._toast.showSuccess('Project Deleted!', 'Update alert');
      this._myProfile.updateUserDetails();
      this._projectEdit.closeModal();
    })
  }
}
