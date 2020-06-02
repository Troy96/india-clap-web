import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthServices } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { MyprofileEditableService } from '../../myprofile-editable.service';
import { EducationService } from '../education/education.service';
import { EmailInviteService } from './email-invite.service';


@Component({
  selector: 'app-email-invite',
  templateUrl: './email-invite.component.html',
  styleUrls: ['./email-invite.component.css']
})
export class EmailInviteComponent implements OnInit {

  emailInviteForm: FormGroup;

  ngOnInit() { }
  isExpire: boolean = true;

  constructor(
    private _fb: FormBuilder,
    private _authService: AuthServices,
    private notifService: NotificationService,
    private _myProfile: MyprofileEditableService,
    public _emailInvite: EmailInviteService
  ) {
    this.emailInviteForm = this._fb.group({
      from: [''],
      to: [''],
      message: [''],
    })
  }

}
