import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  loginForm: FormGroup;

  obj:any={};
  constructor(private authService:AuthService) {
    this.loginForm = new FormGroup({
      email: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required),
    });
   }
  ngOnInit() {
  }

  submit()
  {
    this.loginForm.controls["email"].markAsTouched();
    this.loginForm.controls["password"].markAsTouched();
    if(this.loginForm.valid)
    {
      this.obj.username = this.loginForm.get('email').value;
      this.obj.password = this.loginForm.get('password').value;
      this.authService.login(this.obj).subscribe((data:any)=>{
        console.log(data);
        //            localStorage.setItem("adminBaseUrl",JSON.stringify(_url))

        localStorage.setItem('currentUser',JSON.stringify(data));
      })
    }
  }
}
