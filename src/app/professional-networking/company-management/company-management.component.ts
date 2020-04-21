import { Component, OnInit } from '@angular/core';
import { NetworkingService } from 'src/app/services/networking.service';

@Component({
  selector: 'app-company-management',
  templateUrl: './company-management.component.html',
  styleUrls: ['./company-management.component.css']
})
export class CompanyManagementComponent implements OnInit {

  companyList: any=[];

  constructor(
    private netService: NetworkingService
  ) { }

  ngOnInit() {
    this.getCompaniesManaged();
  }

  getCompaniesManaged() {
    this.netService.get_mycompanies()
      .subscribe(respObj => {
        this.companyList = respObj;
      })
  }
}
