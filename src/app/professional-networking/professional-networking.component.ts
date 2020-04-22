import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MyprofileEditableService } from './my-profile-editable/myprofile-editable.service';


@Component({
  selector: 'app-professional-networking',
  templateUrl: './professional-networking.component.html',
  styleUrls: ['./professional-networking.component.css']
})
export class ProfessionalNetworkingComponent implements OnInit {

  constructor(
    private title: Title,
    public myProfile: MyprofileEditableService
  ) { }

  ngOnInit() {
    this.title.setTitle('Professional Networking | India Clap');
  }

}
