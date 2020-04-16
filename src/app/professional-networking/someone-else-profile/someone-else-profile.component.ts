import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NetworkingService } from 'src/app/services/networking.service';
import { Observable, observable } from 'rxjs';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-someone-else-profile',
  templateUrl: './someone-else-profile.component.html',
  styleUrls: ['./someone-else-profile.component.css']
})
export class SomeoneElseProfileComponent implements OnInit {

  userId: any;
  userDetails: any;
  userList = [];
  contactList: any[];
  connectionStatus: any;
  isLoading: boolean = true;

  constructor(
    private router: ActivatedRoute,
    private authService: AuthService,
    private netService: NetworkingService,
    private notifyService: NotificationService
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
        this.userList = [...respObj];
        this.userDetails = this.userList.find(obj => obj['user'] == this.userId);
      })
  }

  getUserContacts() {
    this.netService.get_contacts()
      .subscribe(respObj => {
        this.contactList = [...respObj];
        this.getConnectionStatus();
      })
  }

  isCurrentUserProfile() {
    return this.userId === this.currentUser['user_id'];
  }

  onFollowRequest() {
    this.netService.follow_request(this.userId)
      .subscribe(respObj => {
        this.notifyService.showSuccess('Your request has been sent to the user', 'Connection Alert');
      });
  }

  onRejectRequest() {
    this.netService.cancel_request(this.userId)
      .subscribe(respObj => {
        this.notifyService.showInfo('Connection request rejected!', 'Connection Alert');
        console.log(respObj);
      })
  }

  onAcceptRequest() {
    this.netService.accept_request(this.userId)
      .subscribe(respObj => {
        this.notifyService.showInfo('Connection request accepted!', 'Connection Alert');
        console.log(respObj);
      })
  }

  onDeleteRequest() {
    this.netService.delete_request(this.userId)
      .subscribe(respObj => {
        this.notifyService.showInfo('Connection request deleted!', 'Connection Alert');
        console.log(respObj)
      })
  }

  isUserConnection() {
    const user = this.userList.find(user => user['id'] === this.userId);
    if (user) return true;
    return false;
  }

  getConnectionStatus() {
    this.contactList.forEach(user => {
      if ((user['user_from']['id'] === this.currentUser['user_id']) && (user['user_to']['id'] === this.userId)) {
        console.log('pending');
        return this.connectionStatus = 'pending';
      }
      else if ((user['user_from']['id'] === this.userId) && (user['user_to']['id'] === this.currentUser['user_id'])) {
        console.log('approval needed');
        return this.connectionStatus = 'approval needed';
      }
    })
    if (!!this.isUserConnection()) {
      this.connectionStatus = 'connected';
    }
    else if ((!this.isUserConnection()) && ((this.connectionStatus != 'pending') && (this.connectionStatus != 'approval needed'))) {
      this.connectionStatus = 'none';
    }
  }

  get currentUser() {
    return JSON.parse(localStorage.getItem('currentUser'));
  }


}
