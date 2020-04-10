import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-search-skilled-course',
  templateUrl: './search-skilled-course.component.html',
  styleUrls: ['./search-skilled-course.component.css']
})
export class SearchSkilledCourseComponent implements OnInit {

  searchSkilledCourseForm:FormGroup;
  constructor(private router:Router) {
    this.searchSkilledCourseForm = new FormGroup({
      name: new FormControl("", Validators.required),
      state: new FormControl("", Validators.required),
      district: new FormControl("", Validators.required),
      from: new FormControl("", Validators.required),
      to: new FormControl("", Validators.required),
      fee: new FormControl("", Validators.required),
      // address_proof: new FormControl("", Validators.required),
      // id_proof: new FormControl("", Validators.required),
      // reference: new FormControl("", Validators.required),
    });
   }
  ngOnInit() {
  }
  submit()
  {
   this.searchSkilledCourseForm.controls["name"].markAsTouched();
   this.searchSkilledCourseForm.controls["state"].markAsTouched();
   this.searchSkilledCourseForm.controls["district"].markAsTouched();
   this.searchSkilledCourseForm.controls["from"].markAsTouched();
   this.searchSkilledCourseForm.controls["to"].markAsTouched();
   this.searchSkilledCourseForm.controls["fee"].markAsTouched();
  //  this.searchSkilledCourseForm.controls["address_proof"].markAsTouched();
  //  this.searchSkilledCourseForm.controls["id_proof"].markAsTouched();
  //  this.searchSkilledCourseForm.controls["reference"].markAsTouched();

   if(this.searchSkilledCourseForm.valid)
   {
     let obj:any={};
     console.log("valid");
     //obj.company=(this.searchSkilledCourseForm.get('name').value);
    //  obj.job_role=(this.searchSkilledCourseForm.get('job_role').value);
    //  obj.job_title=(this.searchSkilledCourseForm.get('job_title').value);
    //  obj.job_desc=(this.searchSkilledCourseForm.get('desc').value);
    //  obj.salary=(this.searchSkilledCourseForm.get('salary_range').value);
    //  obj.skills=(this.searchSkilledCourseForm.get('skills_required').value);
    //  obj.company_mail=(this.searchSkilledCourseForm.get('emp_email').value);
    //  obj.location_State=this.searchSkilledCourseForm.get('job_state').value;
    //  obj.location_District =this.searchSkilledCourseForm.get('job_district').value;
    //  var today = new Date();
    //  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      console.log(this.searchSkilledCourseForm.get('fee').value);
      console.log(this.searchSkilledCourseForm.get('to').value);
    //  obj.date_posted = date;
    
   }
   else{
     console.log("Not valid")
     console.log(this.searchSkilledCourseForm.get('fee').value);
     console.log(this.searchSkilledCourseForm.get('to').value);

   }
  }

}
