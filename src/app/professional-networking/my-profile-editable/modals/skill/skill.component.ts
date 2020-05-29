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
  user_id: any;

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
    this.user_id = JSON.parse(localStorage.getItem('currentUser'))['user_id'];
  }

  onSubmit() {
    if (this.skillForm.invalid) return;

    this._authService.add_skill({
      ...this.skillForm.value,
      user: this.user_id
    }).subscribe(
      data => {
        this.notifService.showSuccess('Skill added!', 'Skill alert');
        this._myProfile.updateUserDetails();
        this._skill.closeModal();
      }
    )
  }

}
