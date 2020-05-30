import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthServices } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { MyprofileEditableService } from '../../myprofile-editable.service';
import { EducationService } from '../education/education.service';
import { ExperienceService } from './experience.service';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent implements OnInit {

  experienceForm: FormGroup
  user_id = JSON.parse(localStorage.getItem('currentUser'))['user_id'];

  constructor(
    private _fb: FormBuilder,
    private _authService: AuthServices,
    private notifService: NotificationService,
    private _myProfile: MyprofileEditableService,
    public _experience: ExperienceService
  ) { }

  ngOnInit() {
    this.experienceForm = this._fb.group({
      company_name: [''],
      start_date: [''],
      end_date: [''],
      is_present: [false],
      title: [''],
      responsibilities: ['']
    })
  }

  onSubmit() {
    if (this.experienceForm.get('is_present').value) this.experienceForm.removeControl('end_date');

    this._authService.add_experience({
      ...this.experienceForm.value,
      user: this.user_id
    }).subscribe(
      data => {
        this.notifService.showSuccess('Experience added!', 'Experience alert');
        this._myProfile.updateUserDetails();
        this._experience.closeModal();
      })
  }

}
