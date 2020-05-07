import { Component, OnInit } from '@angular/core';
import { ContactInfoService } from './contact-info.service';
import { AuthServices } from 'src/app/services/auth.service';

@Component({
  selector: 'app-contact-info',
  templateUrl: './contact-info.component.html',
  styleUrls: ['./contact-info.component.css']
})
export class ContactInfoComponent implements OnInit {

  user: any;
  profileUrl: string;
  slug: string;

  constructor(
    private contactInfo: ContactInfoService,
    private userService: AuthServices
  ) { }

  ngOnInit() {
    this.profileUrl = window.location.href;
    let split = this.profileUrl.split('/');
    this.slug = split[split.length - 1];
    split.pop();
    this.profileUrl = split.join('/');

    this.contactInfo.content$.subscribe(user => {
      this.user = user.data;
    })
  }

  closeContactInfo() {
    this.contactInfo.closeContactInfo();
  }

  updateSlug() {
    this.userService.update_user_details(this.user.id, {
      slug: this.slug
    }).subscribe(
      data => {
        console.log(data)
      }
    )
  }

}
