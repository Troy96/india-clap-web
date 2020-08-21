import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthServices } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-invite-by-email',
  templateUrl: './invite-by-email.component.html',
  styleUrls: ['./invite-by-email.component.css']
})
export class InviteByEmailComponent implements OnInit {

  emailInviteForm: FormGroup;

  ngOnInit() { 
    console.log("in component")
  }
  isExpire: boolean = true;
  link:any= "https://www.holagraph.com";
  profileId:any;
  receivedItems:any;
  constructor(
    private _fb: FormBuilder,
    private _authService: AuthServices,
    private notifyService: NotificationService,
  ) {
    this.profileId=JSON.parse(localStorage.getItem('currentUser')).profile_id; 
    this._authService.get_user_details(this.profileId).subscribe((data):any=>{
      console.log(data);
      this.receivedItems=data;
      this.emailInviteForm = this._fb.group({
        name:[this.receivedItems.first_name+' '+this.receivedItems.last_name],
        from: [this.receivedItems.email],
        to: [''],
        message: ['Join '+this.link+' now to expand your world'],
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
