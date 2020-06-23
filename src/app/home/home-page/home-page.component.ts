import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NotificationService } from 'src/app/services/notification.service';
import { AuthServices } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  @ViewChild('loginRef', {static: true }) loginElement: ElementRef;
  auth2: any;
  constructor(
    private _title: Title,
    private _toast: NotificationService,
    private _user: AuthServices,
    private router: Router
  ) { }

  ngOnInit() {
    this._title.setTitle('Holagraph: Log In or Sign Up');
    this.googleSDK();

  }
 
  
  prepareLoginButton() {
  
    this.auth2.attachClickHandler(this.loginElement.nativeElement, {},
      (googleUser) => {
  
        let profile = googleUser.getBasicProfile();
        console.log('Access Token ' + googleUser.getAuthResponse().access_token)
        console.log(googleUser)
        console.log('Token || ' + googleUser.getAuthResponse().id_token);
        localStorage.setItem('googleAccessToken', googleUser.getAuthResponse().id_token)
        console.log('ID: ' + profile.getId());
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());
        //YOUR CODE HERE
        this._user.gmail_login({Token:googleUser.getAuthResponse().access_token}).subscribe((data:any)=>{
        console.log(data);
         this._toast.showSuccess('You are now logged in','Login successful');
           localStorage.setItem('currentUser', JSON.stringify(data));
           this.router.navigate(['/in/feed']);
        }
        )
  
      }, (error) => {
        this._toast.showWarning('Something went wrong','Login unsuccessful');
  
        alert(JSON.stringify(error, undefined, 2));
      });
  
  }
  googleSDK() {
  
    window['googleSDKLoaded'] = () => {
      window['gapi'].load('auth2', () => {
        this.auth2 = window['gapi'].auth2.init({
          client_id: '1044965227209-dmp3inndqit0dg4ott66u71nv6phpsq4.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
          scope: 'profile email https://www.googleapis.com/auth/contacts.readonly'
        });
        this.prepareLoginButton();
      });
    }
  
    (function(d, s, id){
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement(s); js.id = id;
      js.src = "https://apis.google.com/js/platform.js?onload=googleSDKLoaded";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'google-jssdk'));
  
  }
  
   
}
