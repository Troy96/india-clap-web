import { Component, OnInit } from '@angular/core';
import { AuthServices } from 'src/app/services/auth.service';

import * as moment from 'moment';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  notifList: any[];
  moment: any;
  constructor(
    private authService: AuthServices
  ) {
    this.moment = moment;
  }

  ngOnInit() {
    this.getNotifications();
  }

  getNotifications() {
    this.authService.get_user_notifications()
      .subscribe(respObj => {
        this.notifList = [...respObj]
      })
  }

}
