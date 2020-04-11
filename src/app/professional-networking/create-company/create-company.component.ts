import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NetworkingService } from 'src/app/services/networking.service';
import { JobsService } from 'src/app/services/jobs.service';

@Component({
  selector: 'app-create-company',
  templateUrl: './create-company.component.html',
  styleUrls: ['./create-company.component.css']
})
export class CreateCompanyComponent implements OnInit {

  companyForm: FormGroup;
  sectorList: any[];

  constructor(
    private netService: NetworkingService,
    private jobService: JobsService
  ) {
    this.companyForm = new FormGroup({
      name: new FormControl("", Validators.required),
      industry: new FormControl("", Validators.required),
      logo: new FormControl(""),
      company_size: new FormControl("", Validators.required)
    })
  }

  ngOnInit() {
    this.getIndustries();
  }

  onSubmit() {
    this.companyForm.markAllAsTouched;
    if (this.companyForm.invalid) return;

    if (!this.companyForm.get('logo').value) this.companyForm.removeControl('logo');

    this.netService.create_company(this.companyForm.value)
      .subscribe(respObj => {
        console.log(respObj);
      })
  }

  getIndustries() {
    this.jobService.get_sectors()
      .subscribe(sectors => {
        this.sectorList = [...sectors['results']]
      })
  }

}
