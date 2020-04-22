import { Component, OnInit, Renderer2, ElementRef, ViewChild, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  userDetails: any;
  notifList: string[];

  @ViewChild('notification', { static: false }) moreRef2: ElementRef
  @ViewChild('myprofile', { static: false }) moreRef1: ElementRef
  @ViewChild('more', { static: false }) moreRef: ElementRef
  constructor(
    @Inject(DOCUMENT) private _document: Document,

    private renderer: Renderer2,
    private authService: AuthService,
    private router: Router
  ) {
    this.getNotifications();
  }
  ngOnInit() {
    this.getUserDetails();
  }

  displaynotification() {
    this.renderer.setStyle(this.moreRef2.nativeElement, 'display', 'block');
  }
  displaymyprofile() {
    this.renderer.setStyle(this.moreRef1.nativeElement, 'display', 'block');
  }
  displaymore() {
    this.renderer.setStyle(this.moreRef.nativeElement, 'display', 'block');
  }

  getUserDetails() {
    this.authService.get_user_profiles()
      .subscribe(respObj => {
        this.userDetails = respObj['results'].find(obj => obj['user'] === JSON.parse(localStorage.getItem('currentUser'))['user_id']);
      })
  }

  getNotifications() {
    this.authService.get_user_notifications()
      .subscribe(respObj => {
        this.notifList = [...respObj['results']];
      })
  }

  onLogout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
