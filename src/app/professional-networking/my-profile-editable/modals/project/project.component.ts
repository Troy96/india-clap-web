import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ProjectService } from './project.service';
import { NotificationService } from 'src/app/services/notification.service';
import { AuthServices } from 'src/app/services/auth.service';
import { MyprofileEditableService } from '../../myprofile-editable.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  projectForm: FormGroup;
  profile_id: any;

  constructor(
    private _fb: FormBuilder,
    public _project: ProjectService,
    private notifService: NotificationService,
    private _authService: AuthServices,
    private _myProfile: MyprofileEditableService
  ) {
    this.projectForm = this._fb.group({
      project_name: [''],
      start_date: [''],
      end_date: [''],
      description: [''],
      link: [''],
    })
  }

  ngOnInit() {
    this.profile_id = JSON.parse(localStorage.getItem('currentUser'))['profile_id'];
  }

  async onSubmit() {
    if (this.projectForm.invalid) return;

    try {
      const resp = await this._authService.add_project({
        ...this.projectForm.value,
        user: this.profile_id
      }).toPromise();

      this.notifService.showSuccess('Project added!', 'alert');
      this._myProfile.updateUserDetails();
      this._project.closeModal();


    } catch (err) {
      this._myProfile.handleError(err)

    };
  }

}
