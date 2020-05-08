import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { AuthServices} from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
//import { Au } from "angularx-social-login";
// import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
// import { SocialUser } from "angularx-social-login";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  loginForm: FormGroup;
  //private user: SocialUser;
  private loggedIn: boolean;
  obj: any = {};
  constructor(
    private authService: AuthServices,//private auth_Service: AuthService,
    private router: Router,private notifyService : NotificationService
  ) {
    if (!!JSON.parse(localStorage.getItem('currentUser'))) {
      this.router.navigateByUrl('/in/feed');
    }
    this.loginForm = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
      password: new FormControl("", [Validators.required, , Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}')]),

    });
  }
  ngOnInit() {
  }
  get primEmail() {
    return this.loginForm.get('email')
  }
  get pass() {
    return this.loginForm.get('password')

  }
  submit() {
    this.loginForm.controls["email"].markAsTouched();
    this.loginForm.controls["password"].markAsTouched();
    if (this.loginForm.valid) {
      this.obj.email = this.loginForm.get('email').value;
      this.obj.password = this.loginForm.get('password').value;
      this.obj.confirm_password = this.obj.password;
      this.authService.login(this.obj).subscribe(async (data: any) => {
        this.notifyService.showSuccess('You are now logged in','Login successful');
        await localStorage.setItem('currentUser', JSON.stringify(data));
        this.router.navigateByUrl('/in/feed');
      },
      err=>{
        if(err.error.error=="Invalid Credentials")
          this.showToasterError("Invalid Credentials")
      
      })
    }
  }
  showToasterSuccess(){
    console.log(this.notifyService);
    this.notifyService.showSuccess("Data shown successfully !!", "ItSolutionStuff.com")
}

showToasterError(str:any){
    this.notifyService.showError("Something is wrong", str)
}

showToasterInfo(){
    this.notifyService.showInfo("This is info", "ItSolutionStuff.com")
}

showToasterWarning(){
    this.notifyService.showWarning("This is warning", "ItSolutionStuff.com")
}
  togglepass(event: any) {
    let _el = document.querySelector(".signin-pass-view-btn");
    let _parentEl = _el.parentNode;
    if (_el.classList.contains("visible")) {
      _el.classList.remove("visible");
      _parentEl
        .querySelector("input[type='text']")
        .setAttribute("type", "password");
    } else {
      _el.classList.add("visible");
      _parentEl
        .querySelector("input[type='password']")
        .setAttribute("type", "text");
    }
  }
  // signInWithGoogle(): void {
  //   this.auth_Service.signIn(GoogleLoginProvider.PROVIDER_ID);
  // }
 
  // signInWithFB(): void {
  //  // this.social_login();
  //   this.auth_Service.signIn(FacebookLoginProvider.PROVIDER_ID);
  //   // if(this.user==null)
  //   //   {
  //   //   this.ngOnInit();
  //   // }
  // } 
 
  // signOut(): void {
  //   this.auth_Service.signOut().catch(err=>{
  //     console.log(err)
  //   });
  // }
  // social_login(){
  //   this.auth_Service.authState.subscribe((user) => {
  //     this.user = user;
  //     this.loggedIn = (user != null);
  //     console.log(this.user);
  //   });
  // }
}


