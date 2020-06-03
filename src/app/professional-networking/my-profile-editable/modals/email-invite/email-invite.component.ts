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
  link:any= "http://angular-holagraph.herokuapp.com/";
  profileId:any;
  receivedItems:any;
  constructor(
    private _fb: FormBuilder,
    private _authService: AuthServices,
    private notifyService: NotificationService,
    private _myProfile: MyprofileEditableService,
    public _emailInvite: EmailInviteService
  ) {
    this.profileId=JSON.parse(localStorage.getItem('currentUser')).profile_id; 
    this._authService.get_user_details(this.profileId).subscribe((data):any=>{
      console.log(data);
      this.receivedItems=data;
      this.emailInviteForm = this._fb.group({
        name:[this.receivedItems.first_name+' '+this.receivedItems.last_name],
        from: [this.receivedItems.email],
        to: [''],
        message: ['Please visit '+this.link+' to explore unlimited opportunities'],
      })
    })
   
  }
  onSubmit(){
    if(this.emailInviteForm.valid){
      this._authService.emailInvite({
        name:this.emailInviteForm.get('name').value,
        from_email:this.emailInviteForm.get('from').value,
        to_mail:this.emailInviteForm.get('to').value,
        message:this.emailInviteForm.get('message').value
      }).subscribe((data):any=>{
        console.log(data)
        this.showToasterSuccess('Invitation Sent!')
      },err=>{
        this.showToasterError('Please check details properly')
        console.log(err)
      })
    }
  }
  
  showToasterSuccess(str: any) {
    this.notifyService.showSuccess("Successful", str)
  }
  showToasterError(str: any) {
    this.notifyService.showError("Something is wrong", str)
  }
}
