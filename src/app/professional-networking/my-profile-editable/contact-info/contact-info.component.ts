import { Component, OnInit } from '@angular/core';
import { ContactInfoService } from './contact-info.service';

@Component({
  selector: 'app-contact-info',
  templateUrl: './contact-info.component.html',
  styleUrls: ['./contact-info.component.css']
})
export class ContactInfoComponent implements OnInit {

  user: any;
  profileUrl: string;
  constructor(
    private contactInfo: ContactInfoService
  ) { }

  ngOnInit() {
    this.profileUrl = window.location.href;
    this.contactInfo.content$.subscribe(user => {
      this.user = user.data;
    })
  }

  closeContactInfo(){
    this.contactInfo.closeContactInfo();
  }

}
