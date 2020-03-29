import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.css']
})
export class RegistrationPageComponent implements OnInit {
  registerForm: FormGroup;
 // last_name:any="";
 // regularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

  obj:any={};
  constructor(private authService:AuthService) {
    this.registerForm = new FormGroup({
      first_name: new FormControl("", Validators.required),
      email: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required),
      last_name: new FormControl(""),

    });
   }

  ngOnInit() {
  }
  submit()
  {
    this.registerForm.controls["first_name"].markAsTouched();
    this.registerForm.controls["email"].markAsTouched();
    this.registerForm.controls["password"].markAsTouched();
    if(this.registerForm.valid)
    {
      if(this.registerForm.get('last_name').value!="")
    this.obj.username = (this.registerForm.get('first_name').value+" "+this.registerForm.get('last_name').value);
    else
    this.obj.username = (this.registerForm.get('first_name').value);
    this.obj.email = this.registerForm.get('email').value;
    this.obj.password = this.registerForm.get('password').value;
    this.authService.register(this.obj).subscribe((data:any)=>{
    console.log(data);
    })
    }
  }
}
