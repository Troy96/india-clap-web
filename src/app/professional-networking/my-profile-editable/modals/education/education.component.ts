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
  profile_id = JSON.parse(localStorage.getItem('currentUser'))['profile_id'];
  constructor(
    private _fb: FormBuilder,
    private _authService: AuthServices,
    private notifService: NotificationService,
    private _myProfile: MyprofileEditableService,
    public _education: EducationService
  ) { }

  ngOnInit() {
    this.EducationForm = this._fb.group({
      institute: [''],
      degree: [''],
      is_present: [false],
      study_field: [''],
      start_year: [''],
      end_year: [''],
      grade: [''],
      link: [''],
      desc: [''],

    })
  }

  async onSubmit() {
    if (this.EducationForm.get('is_present').value) this.EducationForm.removeControl('end_year');

    try {
      const resp = await this._authService.add_education({
        ...this.EducationForm.value,
        user: this.profile_id
      }).toPromise();

      this.notifService.showSuccess('Education added!', 'Education alert');
      this._myProfile.updateUserDetails();
      this._education.closeModal();


    } catch (err) {
      this._myProfile.handleError(err)
    }
  }

}
