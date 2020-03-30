import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobsService } from 'src/app/services/jobs.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-job-post-edit',
  templateUrl: './job-post-edit.component.html',
  styleUrls: ['./job-post-edit.component.css']
})
export class JobPostEditComponent implements OnInit {

  jobId: number;
  jobEditForm:FormGroup;
  obj:any={};
  received_data: any;
  constructor(
    private router: ActivatedRoute,private jService:JobsService
  ) {
    this.jobId = +this.router.snapshot.paramMap.get('jobId');
      this.jobEditForm = new FormGroup({
        job_desc: new FormControl("", Validators.required),
        job_title: new FormControl("", Validators.required),
    });
  }
 
  ngOnInit() {
    this.jService.get_job_byId(this.jobId).subscribe((data:any)=>{
      this.received_data=data;
      console.log(this.received_data)
      this.jobEditForm.patchValue({
        job_desc: data.job_desc,
        job_title:data.job_title
      });
    })
   
  }
   edit()
   {
    this.jobEditForm.controls["job_title"].markAsTouched();
    this.jobEditForm.controls["job_desc"].markAsTouched();
    if(this.jobEditForm.valid)
    {
    this.obj.id=this.received_data.id;
    this.obj.job_title= this.jobEditForm.get("job_title").value
    this.obj.job_desc= this.jobEditForm.get("job_desc").value
    this.obj.company = this.received_data.company;
    this.obj.job_role = this.received_data.job_role;
    this.obj.date_posted = this.received_data.date_posted;
    this.obj.location_District = this.received_data.location_District;
    this.obj.location_State = this.received_data.location_State;
    this.obj.skills = this.received_data.skills;
    this.obj.salary = this.received_data.salary;
    console.log(this.obj)
    this.jService.edit_job_post(this.obj,this.obj.id).subscribe((data:any)=>{
      console.log(data);
    })
    }
   }

   delete(){
  this.jService.delete_job_post(this.received_data.id).subscribe((data)=>{
    console.log(data);
  })
   }
}
