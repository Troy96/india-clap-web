import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { NotificationService } from 'src/app/services/notification.service';
import { AuthServices } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
//  private _title: Title

  email: any;

  constructor(
    private _toast: NotificationService,
    private _user: AuthServices,
    private router: Router
  ) { }
  ngOnInit() {
  //  this._title.setTitle('Holagraph: Log In or Sign Up');

  }
 

  storeEmail(){
    this._toast.showSuccess('Thank you! We will let you know on launch!', 'Welcome to Holagraph')
    this._user.storeEmail(this.email)
      .subscribe(resp=>{
        console.log(resp);
      })
  }

  //  onSignIn(googleUser) {
  //   var profile = googleUser.getBasicProfile();
  //   console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  //   console.log('Name: ' + profile.getName());
  //   console.log('Image URL: ' + profile.getImageUrl());
  //   console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  // }
}
