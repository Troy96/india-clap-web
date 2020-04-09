import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-privacy-settings',
  templateUrl: './privacy-settings.component.html',
  styleUrls: ['./privacy-settings.component.css']
})
export class PrivacySettingsComponent implements OnInit {

  userId: number = 7 //remove this
  userDetails : any;

  constructor(
    private authService: AuthService
  ) { 
    this.getUserDetails();
  }

  ngOnInit() {
  }

  getUserDetails() {
    this.authService.get_user_details(this.userId)
      .subscribe(respObj => {
        this.userDetails = { ...respObj };
      })
  }

}
