import { Component, OnInit } from '@angular/core';
import { NetworkingService } from 'src/app/services/networking.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-company-management',
  templateUrl: './company-management.component.html',
  styleUrls: ['./company-management.component.css']
})
export class CompanyManagementComponent implements OnInit {

  companyList: any[];
  profileId: number;

  userDetails: any;

  constructor(
    private netService: NetworkingService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.profileId = JSON.parse(localStorage.getItem('currentUser'))['profile_id'];
    this.getCompaniesManaged();
    this.getUserDetails();
  }

  getCompaniesManaged() {
    this.netService.get_companies()
      .subscribe(respObj => {
        this.companyList = [...respObj];
      })
  }

  getUserDetails() {
    this.authService.get_user_details(this.profileId)
      .subscribe(respObj => {
        this.userDetails = {...respObj};
      })
  }



}
