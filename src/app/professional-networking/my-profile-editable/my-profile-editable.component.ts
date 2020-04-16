import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-my-profile-editable',
  templateUrl: './my-profile-editable.component.html',
  styleUrls: ['./my-profile-editable.component.css']
})
export class MyProfileEditableComponent implements OnInit {

  userId: number;
  userDetails: object;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.userId = JSON.parse(localStorage.getItem('currentUser'))['user_id'];
    this.getUserDetails();
  }

  getUserDetails() {
    this.authService.get_user_details(this.userId)
      .subscribe(respObj => {
        this.userDetails = {...respObj}
        console.log(this.userDetails);
      })
  }

}
