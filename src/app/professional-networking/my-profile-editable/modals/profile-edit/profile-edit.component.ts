import { Component, OnInit } from '@angular/core';
import { ProfileEditService } from './profile-edit.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthServices } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { MyprofileEditableService } from '../../myprofile-editable.service';
@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {

  profileForm: FormGroup
  content: any;

  constructor(
    public _profileEdit: ProfileEditService,
    private _fb: FormBuilder,
    private _auth: AuthServices,
    private _toast: NotificationService,
    private _myProfile: MyprofileEditableService
  ) { }

  ngOnInit() {
    this._profileEdit.content$
      .subscribe(
       (editData:any) => {
          if (!editData) return
          this.content = editData.data;
          console.log(this.content)
          this.profileForm = this._fb.group({
            first_name: [editData.data.first_name],
            last_name: [editData.data.last_name],
            location_district:[editData.data.location_district],
            location_country: [editData.data.location_country],
            profession: [editData.data.profession],
           
          })
        }
      )
  }

  onSave() {
    if (this.profileForm.invalid) return
    this._auth.update_user_details(this.content.id, {
      ...this.profileForm.value,
      // userId: JSON.parse(localStorage.getItem('currentUser'))['user_id']
    })
      .subscribe(res => {
        this._toast.showSuccess('Profile details updated!', 'Update alert');
        this._myProfile.updateUserDetails();
        this._profileEdit.closeModal();
      })
  }

}
