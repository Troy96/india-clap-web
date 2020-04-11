import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loan-application',
  templateUrl: './loan-application.component.html',
  styleUrls: ['./loan-application.component.css']
})
export class LoanApplicationComponent implements OnInit {

  loanApplicationForm:FormGroup;
  constructor(private router:Router) {
    this.loanApplicationForm = new FormGroup({
      name: new FormControl("", Validators.required),
      loan_provider: new FormControl("", Validators.required),
      bank_name: new FormControl("", Validators.required),
      account_number: new FormControl("", Validators.required),
      contact_number: new FormControl("", Validators.required),
      loan_purpose: new FormControl("", Validators.required),
      address_proof: new FormControl("", Validators.required),
      id_proof: new FormControl("", Validators.required),
      reference: new FormControl("", Validators.required),
    });
   }
  ngOnInit() {
  }

  submit()
  {
   this.loanApplicationForm.controls["name"].markAsTouched();
   this.loanApplicationForm.controls["loan_provider"].markAsTouched();
   this.loanApplicationForm.controls["bank_name"].markAsTouched();
   this.loanApplicationForm.controls["account_number"].markAsTouched();
   this.loanApplicationForm.controls["contact_number"].markAsTouched();
   this.loanApplicationForm.controls["loan_purpose"].markAsTouched();
   this.loanApplicationForm.controls["address_proof"].markAsTouched();
   this.loanApplicationForm.controls["id_proof"].markAsTouched();
   this.loanApplicationForm.controls["reference"].markAsTouched();

   if(this.loanApplicationForm.valid)
   {
     let obj:any={};
     console.log("valid");
     //obj.company=(this.loanApplicationForm.get('name').value);
    //  obj.job_role=(this.loanApplicationForm.get('job_role').value);
    //  obj.job_title=(this.loanApplicationForm.get('job_title').value);
    //  obj.job_desc=(this.loanApplicationForm.get('desc').value);
    //  obj.salary=(this.loanApplicationForm.get('salary_range').value);
    //  obj.skills=(this.loanApplicationForm.get('skills_required').value);
    //  obj.company_mail=(this.loanApplicationForm.get('emp_email').value);
    //  obj.location_State=this.loanApplicationForm.get('job_state').value;
    //  obj.location_District =this.loanApplicationForm.get('job_district').value;
    //  var today = new Date();
    //  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    //  console.log(date);
    
    //  obj.date_posted = date;
    
   }
   else{
     console.log("Not valid")
   }
  }
}
