import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  resetPasswordForm:FormGroup;
  obj:any={};
  constructor(private router:Router,private authService:AuthService) {
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
      },err=>{
        console.log(err);
      })
    }
  
  }

}
