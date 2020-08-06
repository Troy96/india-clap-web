import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobsService } from 'src/app/services/jobs.service';

import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/services/notification.service';


@Component({
  selector: 'app-upload-resume',
  templateUrl: './upload-resume.component.html',
  styleUrls: ['./upload-resume.component.css']
})
export class UploadResumeComponent implements OnInit {

  jobId: number;
  jobObj: any;

  companyId: number;
  companyObj: any;

  uploadResumeForm: FormGroup;
  @ViewChild('profileShare', {static: false}) profileShareRef: ElementRef;
  constructor(
    private route: ActivatedRoute,
    private jobService: JobsService,
    private cd: ChangeDetectorRef,
    private notifService: NotificationService
  ) {
    this.jobId = Number(this.route.snapshot.paramMap.get('jobId'));
    this.getJobDetails(this.jobId);
    this.uploadResumeForm = new FormGroup({
      text: new FormControl(null, Validators.required),
      video: new FormControl(null)
    })
  }

  ngOnInit() {
  }

  getJobDetails(jobId: number) {
    this.jobService.get_job_description(jobId)
      .subscribe(respObj => {
        this.jobObj = { ...respObj };
      })
  }

  // getCompanyDetails() {
  //   this.jobService.get_company_details(this.companyId)
  //     .subscribe(respObj => {
  //       this.companyObj = { ...respObj };
  //     })
  // }

  onSubmit() {
    this.jobService.upload_resume(this.jobId, this.uploadResumeForm.value)
      .subscribe(respObj => {
        this.notifService.showSuccess(respObj['details'], 'job alert');
      }, err=> {
        console.log(err)
      })
  }

  onResumeUpload(event) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {

      let selectedFiles = event.target.files;
      let _file = selectedFiles[0];
      this.uploadResumeForm.patchValue({
        video: ""
      });
      let obj: any = {};
      obj.video_resume = _file;
      let userId = (JSON.parse(localStorage.getItem('currentUser'))).profile_id;
      this.jobService.send_video(userId, obj).subscribe((data): any => {
        console.log(data);
      })
    }
    else {
      this.notifService.showWarning('No file selected', 'job alert');
    }
  }


  displayPopup(){
    this.profileShareRef.nativeElement.style.display = 'block';
  }



}
