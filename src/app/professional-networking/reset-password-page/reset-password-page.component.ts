import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { AuthServices} from 'src/app/services/auth.service';
import { NetworkingService } from 'src/app/services/networking.service';

@Component({
  selector: 'app-reset-password-page',
  templateUrl: './reset-password-page.component.html',
  styleUrls: ['./reset-password-page.component.css']
})
export class ResetPasswordPageComponent implements OnInit {
  resetPasswordForm:FormGroup;
  passwordValidation: boolean=false;
  obj:any={};
  constructor(private router: Router,
    private networkService: NetworkingService,private notifyService : NotificationService) {
      this.resetPasswordForm = new FormGroup({
        password1: new FormControl("", [Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}')]),
        password2: new FormControl("", [Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}')])
      });
    }
  ngOnInit() {
  }
  get pass1(){
    return this.resetPasswordForm.get('password1')

  }  
  get pass2(){
    return this.resetPasswordForm.get('password2')

  }  
  reset_password(){
    this.resetPasswordForm.controls["password1"].markAsTouched();
    this.resetPasswordForm.controls["password2"].markAsTouched();
  
    if((this.resetPasswordForm.get('password1').value)!=(this.resetPasswordForm.get('password2').value)&&this.resetPasswordForm.valid) 
    {
      this.passwordValidation=true;
      // console.log("he;;p")
    }
    else
    this.passwordValidation = false;
    
    if(this.resetPasswordForm.valid ){
      this.obj.old_password = (this.resetPasswordForm.get('password1').value);
      this.obj.new_password = (this.resetPasswordForm.get('password2').value);

      this.networkService.change_password(this.obj).subscribe((data)=>{
        console.log(data);
        this.showToasterSuccess()
        setTimeout(() => { this.router.navigate(['/in/me']) }, 7000);

      },
      err=>{
        console.log(err)
        try{
          if(err.error.password[0])
          this.showToasterError("Please try another password");
          

          // if(err.error.email[0])
          // this.emailValidation = true
          // else
          // this.emailValidation = false;
          // if(err.error.email[0])
          // this.passwordValidation = true;
          // else
          // this.passwordValidation = false;
          // console.log(err.error.email[0]);
        }
        catch(e){
          this.showToasterError("Invalid Password");

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
  this.notifyService.showSuccess("Successful", "Password Changed !")
}

}
