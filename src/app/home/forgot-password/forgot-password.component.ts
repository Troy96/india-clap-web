import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  resetPasswordForm:FormGroup;
  obj:any={};
  constructor(private router:Router,private authService:AuthService,private notifyService : NotificationService) {
    this.resetPasswordForm = new FormGroup({
      email: new FormControl("",[ Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
    });
   }

  ngOnInit() {
  }
  get primEmail(){
    return this.resetPasswordForm.get('email')
    }
  reset_password(){
    this.resetPasswordForm.controls["email"].markAsTouched();
    if(this.resetPasswordForm.valid){
      this.obj.email = (this.resetPasswordForm.get('email').value);

      this.authService.forgot_password(this.obj).subscribe((data)=>{
        console.log(data);
        this.showToasterSuccess()
      },err=>{
        console.log(err);
        try{
          if(err.error.email[0]=="There is no active user associated with this e-mail address or the password can not be changed")
          this.showToasterError("Email is not registered or invalid email")

        }
        catch(e){
          console.log(e);
        }
      })
    }
  
  }
  showToasterError(str:any){
    this.notifyService.showError("Something is wrong", str)
}
showToasterSuccess(){
  console.log(this.notifyService);
  this.notifyService.showSuccess("Successful", "Email sent !")
}
}
