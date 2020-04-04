import { Component, OnInit } from '@angular/core';
import { NetworkingService } from 'src/app/services/networking.service';

@Component({
  selector: 'app-company-admin-view',
  templateUrl: './company-admin-view.component.html',
  styleUrls: ['./company-admin-view.component.css']
})
export class CompanyAdminViewComponent implements OnInit {

  companyId = 1;
  companyDetails: any = {};

  constructor(
    private netService: NetworkingService
  ) {
    this.getCompanyDetails();
   }

  ngOnInit() {
    
  }

  getCompanyDetails() {
    this.netService.get_company_details(this.companyId)
      .subscribe(respObj => {
        this.companyDetails = { ...respObj };
      })
  }

}
