import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProjectService } from '../project/project.service';
import { NotificationService } from 'src/app/services/notification.service';
import { AuthServices } from 'src/app/services/auth.service';
import { MyprofileEditableService } from '../../myprofile-editable.service';
import { SkillService } from './skill.service';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.css']
})
export class SkillComponent implements OnInit {

  skillForm: FormGroup;
  profile_id: any;

  constructor(
    private _fb: FormBuilder,
    private notifService: NotificationService,
    private _authService: AuthServices,
    private _myProfile: MyprofileEditableService,
    public _skill: SkillService
  ) {
    this.skillForm = this._fb.group({
      skill: [''],
      level: [''],
    })
  }

  ngOnInit() {
    this.profile_id = JSON.parse(localStorage.getItem('currentUser'))['profile_id'];
  }

  async onSubmit() {
    if (this.skillForm.invalid) return;

    try {
      const resp = await this._authService.add_skill({
        ...this.skillForm.value,
        user: this.profile_id
      }).toPromise();

      this.notifService.showSuccess('Skill added!', 'Skill alert');
      this._myProfile.updateUserDetails();
      this._skill.closeModal();;


    } catch (err) {
      this._myProfile.handleError(err)
    }
  }

}
