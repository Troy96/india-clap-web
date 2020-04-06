import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

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
    private authService: AuthService
  ) {
    this.userId = +this.router.snapshot.paramMap.get('id');
    this.getUserDetails();
  }

  ngOnInit() {
  }

  getUserDetails() {
    this.authService.get_user_profiles()
      .subscribe(respObj => {
        const userList: any[] = respObj['results'];
        this.userDetails = userList.find(obj => obj['user'] == this.userId);
      })
  }

  isCurrentUserProfile() {
    return this.userId === localStorage.getItem('currentUser')['user_id'];
  }

}
