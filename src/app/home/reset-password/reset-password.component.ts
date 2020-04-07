import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  _params: any;
  resetPasswordForm:FormGroup;
  obj:any={};
  emailValidation: boolean=false;
  passwordValidation: boolean=false;
  constructor(private router: Router,
    private authService: AuthService, private activeRoute: ActivatedRoute) {
      this.resetPasswordForm = new FormGroup({
        password1: new FormControl("", [Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}')]),
        password2: new FormControl("", Validators.required)
      });
    activeRoute.queryParams.subscribe((params) => {
      this._params = params.token
      console.log(params.token)
    });
  }
  get pass(){
    return this.resetPasswordForm.get('password1')

  }  

  reset_password(){
    this.resetPasswordForm.controls["password1"].markAsTouched();
    this.resetPasswordForm.controls["password2"].markAsTouched();
  
    if((this.resetPasswordForm.get('password1').value)!=(this.resetPasswordForm.get('password2').value)&&this.resetPasswordForm.valid) 
    {
      this.passwordValidation=true;
      console.log("he;;p")
    }
    else
    this.passwordValidation = false;
    
    if(this.resetPasswordForm.valid && (this.resetPasswordForm.get('password1').value)==this.resetPasswordForm.get('password2').value){
      this.obj.password = (this.resetPasswordForm.get('password1').value);
      this.obj.token =  this._params;
      this.authService.reset_password(this.obj).subscribe((data)=>{
        console.log(data);
      },
      err=>{
        try{
          console.log(err.error.password[0]);
  
          if(err.error.email[0])
          this.emailValidation = true
          else
          this.emailValidation = false;
          if(err.error.email[0])
          this.passwordValidation = true;
          else
          this.passwordValidation = false;
          console.log(err.error.email[0]);
        }
        catch(e){
        console.log(e);
        }
      })
    }
  
  }

  ngOnInit() {
  }

}
