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

  ngOnInit() {
    console.log("in component")
  }
  isExpire: boolean = true;
  link: any = "http://angular-holagraph.herokuapp.com/";
  profileId: any;
  receivedItems: any;
  constructor(
    private _fb: FormBuilder,
    private _authService: AuthServices,
    private notifyService: NotificationService,
    private _myProfile: MyprofileEditableService,
    public _emailInvite: EmailInviteService
  ) {
    this.profileId = JSON.parse(localStorage.getItem('currentUser')).profile_id;
    this._authService.get_user_details(this.profileId).subscribe((data): any => {
      this.receivedItems = data;
      this.emailInviteForm = this._fb.group({
        name: [this.receivedItems.first_name + ' ' + this.receivedItems.last_name],
        from: [this.receivedItems.email],
        to: [''],
        message: ['Please visit ' + this.link + ' to explore unlimited opportunities'],
      })
    })

  }
  async onSubmit() {
    if (this.emailInviteForm.invalid) return;


    try {
      const resp = await this._authService.emailInvite({
        name: this.emailInviteForm.get('name').value,
        from_email: this.emailInviteForm.get('from').value,
        to_mail: this.emailInviteForm.get('to').value,
        message: this.emailInviteForm.get('message').value
      }).toPromise();

      this.showToasterSuccess('Invitation Sent!')

    } catch (err) {
      this._myProfile.handleError(err)

    }
  }

  showToasterSuccess(str: any) {
    this.notifyService.showSuccess("Successful", str)
  }
  showToasterError(str: any) {
    this.notifyService.showError("Something is wrong", str)
  }
}
