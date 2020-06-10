import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/services/notification.service';
import { AuthServices } from 'src/app/services/auth.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  email: any;

  constructor(
    private _toast: NotificationService,
    private _user: AuthServices
  ) { }

  ngOnInit() {
  }

  storeEmail(){
    this._toast.showSuccess('Thank you! We will let you know on launch!', 'Welcome to Holagraph')
    this._user.storeEmail(this.email)
      .subscribe(resp=>{
        console.log(resp);
      })
  }

}
