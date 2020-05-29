import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthServices } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { MyprofileEditableService } from '../../myprofile-editable.service';
import { EducationService } from './education.service';
@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit {

 
  EducationForm: FormGroup
  user_id = JSON.parse(localStorage.getItem('currentUser'))['user_id'];
  constructor(
    private _fb: FormBuilder,
    private _authService: AuthServices,
    private notifService: NotificationService,
    private _myProfile: MyprofileEditableService,
    private _education: EducationService
  ) { }

  ngOnInit() {
    this.EducationForm = this._fb.group({
      institute: [''],
      degree: [''],
      is_present:[false],
      study_field: [''],
      start_year: [''],
      end_year: [''],
      grade:[''],
      link:[''],
      desc:[''],

    })
  }

  onSubmit() {
    if (this.EducationForm.get('is_present').value) this.EducationForm.removeControl('end_year');
console.log(this.EducationForm.value)

    this._authService.add_education({
      ...this.EducationForm.value,
      user: this.user_id
    }).subscribe(
      data => {
        this.notifService.showSuccess('Institute added!', 'Institute alert');
        this._myProfile.updateUserDetails();
        this._education.closeModal();
      })
  }

}
