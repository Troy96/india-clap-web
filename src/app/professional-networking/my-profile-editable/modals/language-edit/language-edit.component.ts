import { Component, OnInit } from '@angular/core';
import { ProjectEditService } from '../project-edit/project-edit.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthServices } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { MyprofileEditableService } from '../../myprofile-editable.service';
import { LanguageEditService } from './language-edit.service';

@Component({
  selector: 'app-language-edit',
  templateUrl: './language-edit.component.html',
  styleUrls: ['./language-edit.component.css']
})
export class LanguageEditComponent implements OnInit {

  languageEditForm: FormGroup
  content: any;

  constructor(
    public _languageEdit: LanguageEditService,
    private _fb: FormBuilder,
    private _auth: AuthServices,
    private _toast: NotificationService,
    private _myProfile: MyprofileEditableService
  ) { }

  ngOnInit() {
    this._languageEdit.content$
      .subscribe(
        editData => {
          if (!editData) return
          this.content = editData.data;
          this.languageEditForm = this._fb.group({
            language: [editData.data.language],
            proficiency: [editData.data.proficiency],
          })
        }
      )
  }

  onSave() {
    if (this.languageEditForm.invalid) return
    this._auth.update_language(this.content.id, {
      ...this.languageEditForm.value,
      userId: JSON.parse(localStorage.getItem('currentUser'))['user_id']
    })
      .subscribe(res => {
        this._toast.showSuccess('Language details updated!', 'Update alert');
        this._myProfile.updateUserDetails();
        this._languageEdit.closeModal();
      })
  }

}
