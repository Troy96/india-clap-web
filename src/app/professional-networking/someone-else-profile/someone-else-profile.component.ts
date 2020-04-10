import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NetworkingService } from 'src/app/services/networking.service';

@Component({
  selector: 'app-someone-else-profile',
  templateUrl: './someone-else-profile.component.html',
  styleUrls: ['./someone-else-profile.component.css']
})
export class SomeoneElseProfileComponent implements OnInit {

  userId: any;
  userDetails: any;
  isLoading: boolean = true;

  constructor(
    private router: ActivatedRoute,
    private authService: AuthService,
    private netService: NetworkingService
  ) {
    this.userId = +this.router.snapshot.paramMap.get('id');
    this.getUserDetails();
  }

  ngOnInit() {
    this.getUserContacts();
  }

  getUserDetails() {
    this.authService.get_user_profiles()
      .subscribe(respObj => {
        const userList: any[] = respObj['results'];
        this.userDetails = userList.find(obj => obj['user'] == this.userId);
      })
  }

  getUserContacts() {
    this.netService.get_contacts()
      .subscribe(respObj => {
        console.log(respObj);
      })
  }

  isCurrentUserProfile() {
    return this.userId === localStorage.getItem('currentUser')['user_id'];
  }

  onFollowRequest() {
    this.netService.follow_request(this.userId)
      .subscribe(respObj => {
        console.log(respObj)
      });
  }

  

}
