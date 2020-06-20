import { Component, OnInit } from '@angular/core';
import { AuthServices } from 'src/app/services/auth.service';

@Component({
  selector: 'app-import-contact',
  templateUrl: './import-contact.component.html',
  styleUrls: ['./import-contact.component.css']
})
export class ImportContactComponent implements OnInit {

  constructor(
    private _user: AuthServices
  ) { }

  accessToken: string = localStorage.getItem('googleAccessToken');

  ngOnInit() {
    this._user.fetchGoogleContacts(this.accessToken)
      .subscribe(data => {
        console.log(data);
      })
  }

}
