import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NotificationService } from 'src/app/services/notification.service';
import { AuthServices } from 'src/app/services/auth.service';
import { MyprofileEditableService } from '../../myprofile-editable.service';
import { SkillService } from '../skill/skill.service';
import { HobbyService } from './hobby.service';

@Component({
  selector: 'app-hobby',
  templateUrl: './hobby.component.html',
  styleUrls: ['./hobby.component.css']
})
export class HobbyComponent implements OnInit {

  hobbyForm: FormGroup;
  user_id: any;

  constructor(
    private _fb: FormBuilder,
    private notifService: NotificationService,
    private _authService: AuthServices,
    private _myProfile: MyprofileEditableService,
    public _hobby: HobbyService
  ) {
    this.hobbyForm = this._fb.group({
      title: [''],
      desc: [''],
    })
  }

  ngOnInit() {
    this.user_id = JSON.parse(localStorage.getItem('currentUser'))['user_id'];
  }

  async onSubmit() {
    try {
      if (this.hobbyForm.invalid) return;
      const resp = await this._authService.add_hobby({
        ...this.hobbyForm.value,
        user: this.user_id
      }).toPromise();
      this.notifService.showSuccess('Hobby added!', 'Hobby alert');
      this._myProfile.updateUserDetails();
      this._hobby.closeModal();
    } catch (err) {
      this._myProfile.handleError(err)
    }
  }

}
