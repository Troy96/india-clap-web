import { Component, OnInit, Renderer2, ElementRef, ViewChild, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from '../../services/notification.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  userlist: any[];
  userDetails: any;
  notifList: string[];
  searchKey: string;
  @ViewChild('more', { static: false }) moreRef3: ElementRef
  @ViewChild('notification', { static: false }) moreRef2: ElementRef
  @ViewChild('myprofile', { static: false }) moreRef1: ElementRef
  @ViewChild('more', { static: false }) moreRef: ElementRef
  constructor(
    @Inject(DOCUMENT) private _document: Document,

    private renderer: Renderer2,
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService
  ) {
    this.getNotifications();
  }
  ngOnInit() {
    this.getUserDetails();
    this.authService.get_user_profiles().subscribe(
      data => {
        this.userlist = data;
      }
    )
  }
  displaysearch() {

    this.authService.search_user(this.searchKey)
      .subscribe(respObj => {
        if (!respObj.length) {
          return this.notificationService.showInfo('No User Found', 'Search Alert');
        }
        else {
          this.router.navigateByUrl('/professional-networking/users/' + respObj[0].id);
        }
      })
  }
  displaynotification() {
    this.renderer.setStyle(this.moreRef2.nativeElement, 'display', 'block');
  }

  hideNotifications(){
    this.renderer.setStyle(this.moreRef2.nativeElement, 'display', 'none');
  }


  getUserDetails() {
    this.authService.get_user_profiles()
      .subscribe(respObj => {
        this.userDetails = respObj.find(obj => obj['user'] === JSON.parse(localStorage.getItem('currentUser'))['user_id']);
      })
  }

  getNotifications() {
    this.authService.get_user_notifications()
      .subscribe(respObj => {
        this.notifList = respObj;
      })
  }

  onLogout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }


}
