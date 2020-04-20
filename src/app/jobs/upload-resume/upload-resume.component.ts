import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobsService } from 'src/app/services/jobs.service';

import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-upload-resume',
  templateUrl: './upload-resume.component.html',
  styleUrls: ['./upload-resume.component.css']
})
export class UploadResumeComponent implements OnInit {

  jobId: number;
  jobObj: any;
  profshare:boolean=true;
  companyId: number;
  companyObj: any;

  uploadResumeForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private jobService: JobsService,
    private cd: ChangeDetectorRef
  ) {
    this.jobId = Number(this.route.snapshot.paramMap.get('jobId'));
    this.getJobDetails(this.jobId);
    this.uploadResumeForm = new FormGroup({
      text: new FormControl("", Validators.required),
      video: new FormControl(null, Validators.required)
    })
  }

  ngOnInit() {
  }

  getJobDetails(jobId: number) {
    this.jobService.get_job_description(jobId)
      .subscribe(respObj => {
        this.jobObj = { ...respObj };
        this.companyId = this.jobObj['company'];
        this.getCompanyDetails();
      })
  }

  getCompanyDetails() {
    this.jobService.get_company_details(this.companyId)
      .subscribe(respObj => {
        this.companyObj = { ...respObj };
      })
  }
  profileshare(){
    this.profshare=!this.profshare;
  }
  onSubmit() {
    if (!this.uploadResumeForm.valid) return;

    this.jobService.upload_resume(this.jobId, this.uploadResumeForm.value)
      .subscribe(respObj => {
        console.log(respObj);
      })
  }

  onResumeUpload(event) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.uploadResumeForm.patchValue({
          video: reader.result
        });

        this.cd.markForCheck();
      };
    }
  }



}
