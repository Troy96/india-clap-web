import { Component, OnInit } from '@angular/core';
import { ProjectEditService } from '../project-edit/project-edit.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthServices } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { MyprofileEditableService } from '../../myprofile-editable.service';
import { SkillEditService } from './skill-edit.service';

@Component({
  selector: 'app-skill-edit',
  templateUrl: './skill-edit.component.html',
  styleUrls: ['./skill-edit.component.css']
})
export class SkillEditComponent implements OnInit {

  skillEditForm: FormGroup
  content: any;

  constructor(
    public _skillEdit: SkillEditService,
    private _fb: FormBuilder,
    private _auth: AuthServices,
    private _toast: NotificationService,
    private _myProfile: MyprofileEditableService
  ) { }

  ngOnInit() {
    this._skillEdit.content$
      .subscribe(
        editData => {
          if (!editData) return
          this.content = editData.data;
          this.skillEditForm = this._fb.group({
            skill: [editData.data.skill],
            level: [editData.data.level],
          })
        }
      )
  }

  onSave() {
    if (this.skillEditForm.invalid) return
    this._auth.update_skill(this.content.id, {
      ...this.skillEditForm.value,
      userId: JSON.parse(localStorage.getItem('currentUser'))['user_id']
    })
      .subscribe(res => {
        this._toast.showSuccess('Skill details updated!', 'Update alert');
        this._myProfile.updateUserDetails();
        this._skillEdit.closeModal();
      })
  }
  onDelete(){
    this._auth.delete_skills(this.content.id).subscribe((data:any)=>{
      this._toast.showSuccess('Skill Deleted!', 'Update alert');
      this._myProfile.updateUserDetails();
      this._skillEdit.closeModal();
    })
   
  }
}
