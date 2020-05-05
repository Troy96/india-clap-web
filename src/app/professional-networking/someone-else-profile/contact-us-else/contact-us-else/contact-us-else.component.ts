import { Component, OnInit } from '@angular/core';
import { ContactUsElseService } from './contact-us-else.service';

@Component({
  selector: 'app-contact-us-else',
  templateUrl: './contact-us-else.component.html',
  styleUrls: ['./contact-us-else.component.css']
})
export class ContactUsElseComponent implements OnInit {

  user: any;
  profileUrl: string;

  constructor(
    private contactUs: ContactUsElseService
  ) { }

  ngOnInit() {
    this.profileUrl = window.location.href;
    this.contactUs.content$.subscribe(respObj=>{
      this.user = respObj.data;
    })
  }

  closeContactInfo(){
    this.contactUs.closeContactInfo();
  }

}
