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
  contactData:any;
  phone_num:any;
  profileId:any;
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
     this.profileId = JSON.parse(localStorage.getItem('currentUser')).profile_id;
    console.log(this.profileId)
     this.userService.get_user_details(this.profileId).subscribe((data):any=>{
       console.log(data);
       this.contactData=data;
       if(this.contactData.phone[0])
       this.phone_num=this.contactData.phone[0].phone_number
       else
       this.phone_num=''
     })
  }

  closeContactInfo() {
    this.contactInfo.closeContactInfo();
  }

  updateSlug() {
    if(this.contactData.phone[0])
    {
      let phoneId = this.contactData.phone[0].id;
      this.userService.update_phone_details(phoneId, {
        phone_number: parseInt(this.phone_num),
        user:this.profileId
      }).subscribe(
        data => {
          console.log(data)
        }
      )
    }
    else{
      this.userService.add_user_details(this.user.id, {
        phone_number: parseInt(this.phone_num),
        user:this.profileId
      }).subscribe(
        data => {
          console.log(data)
        }
      )
    }
  }

}
