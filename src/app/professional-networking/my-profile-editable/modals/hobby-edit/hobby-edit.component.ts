import { Component, OnInit } from '@angular/core';
import { ProjectEditService } from '../project-edit/project-edit.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthServices } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { MyprofileEditableService } from '../../myprofile-editable.service';
import { HobbyEditService } from './hobby-edit.service';

@Component({
  selector: 'app-hobby-edit',
  templateUrl: './hobby-edit.component.html',
  styleUrls: ['./hobby-edit.component.css']
})
export class HobbyEditComponent implements OnInit {

  hobbyEditForm: FormGroup
  content: any;

  constructor(
    public _hobbyEdit: HobbyEditService,
    private _fb: FormBuilder,
    private _auth: AuthServices,
    private _toast: NotificationService,
    private _myProfile: MyprofileEditableService
  ) { }

  ngOnInit() {
    this._hobbyEdit.content$
      .subscribe(
        editData => {
          if (!editData) return
          this.content = editData.data;
          this.hobbyEditForm = this._fb.group({
            title: [editData.data.title],
            desc: [editData.data.desc],
          })
        }
      )
  }

  onSave() {
    if (this.hobbyEditForm.invalid) return
    this._auth.update_hobby(this.content.id, {
      ...this.hobbyEditForm.value,
      userId: JSON.parse(localStorage.getItem('currentUser'))['user_id']
    })
      .subscribe(res => {
        this._toast.showSuccess('Hobby details updated!', 'Update alert');
        this._myProfile.updateUserDetails();
        this._hobbyEdit.closeModal();
      })
  }

}
