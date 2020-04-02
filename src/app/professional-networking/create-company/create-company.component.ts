import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-company',
  templateUrl: './create-company.component.html',
  styleUrls: ['./create-company.component.css']
})
export class CreateCompanyComponent implements OnInit {

  companyForm: FormGroup;

  constructor() {
    this.companyForm = new FormGroup({
      name: new FormControl("", Validators.required),
      industry: new FormControl("", Validators.required),
      logo: new FormControl(""),
      company_size: new FormControl("", Validators.required)
    })
  }

  ngOnInit() {
  }

}
