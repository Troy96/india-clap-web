import { Component, OnInit } from '@angular/core';
import { AuthServices } from 'src/app/services/auth.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  notifList: any[];
  constructor(
    private authService: AuthServices
  ) { }

  ngOnInit() {
    this.getNotifications();
  }

  getNotifications() {
    this.authService.get_user_notifications()
      .subscribe(respObj => {
        this.notifList = respObj;
      })
  }

}
