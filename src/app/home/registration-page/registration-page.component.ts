import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.css']
})
export class RegistrationPageComponent implements OnInit {
  registerForm: FormGroup;
 // last_name:any="";
 // regularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
 validateEmail = true; 
  obj:any={};
  emailValidation: boolean = false;
  passwordValidation: boolean = false;

  constructor(private authService:AuthService,private notifyService : NotificationService) {
    this.registerForm = new FormGroup({
      first_name: new FormControl("", Validators.required),
      email: new FormControl("",[
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
      // password: new FormControl("", Validators.required),
          password: new FormControl("", [Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}')]),

      last_name: new FormControl(""),

    });
   }

  ngOnInit() {
  }
  // get f() { 	return this.registerForm.get('email'); }
  get primEmail(){
    return this.registerForm.get('email')
    }
  get pass(){
    return this.registerForm.get('password')

  }  
  submit()
  {
    this.registerForm.controls["first_name"].markAsTouched();
    this.registerForm.controls["email"].markAsTouched();
    this.registerForm.controls["password"].markAsTouched();
    if(this.registerForm.valid)
    {
      
    this.obj.first_name = (this.registerForm.get('first_name').value);
    this.obj.last_name = (this.registerForm.get('last_name').value);
    //this.obj.username = this.obj.first_name + " " + this.obj.last_name;
    this.obj.email = this.registerForm.get('email').value;
    this.obj.password = this.registerForm.get('password').value;
    this.obj.confirm_password = this.registerForm.get('password').value;
    this.authService.register(this.obj).subscribe((data:any)=>{
    console.log(data);
    },
    err=>{
      try{
        console.log(err.error.password[0]);
        console.log(err.error.email[0]);

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
  showToasterSuccess(){
    console.log(this.notifyService);
    this.notifyService.showSuccess("Data shown successfully !!", "ItSolutionStuff.com")
}

showToasterError(){
    this.notifyService.showError("Something is wrong", "ItSolutionStuff.com")
}

showToasterInfo(){
    this.notifyService.showInfo("This is info", "ItSolutionStuff.com")
}

showToasterWarning(){
    this.notifyService.showWarning("This is warning", "ItSolutionStuff.com")
}
}
