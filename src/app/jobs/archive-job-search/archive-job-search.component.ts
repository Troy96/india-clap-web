import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { JobsService } from 'src/app/services/jobs.service';

@Component({
  selector: 'app-archive-job-search',
  templateUrl: './archive-job-search.component.html',
  styleUrls: ['./archive-job-search.component.css']
})
export class ArchiveJobSearchComponent implements OnInit {
  isCollapsed:boolean=true;
  archiveJobSearchForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private jobService: JobsService
  ) {
    this.archiveJobSearchForm = new FormGroup({
      month: new FormControl("", Validators.required),
      job_title: new FormControl("", Validators.required),

    });
  }
  submit() {
    this.archiveJobSearchForm.controls["month"].markAsTouched();
    this.archiveJobSearchForm.controls["job_title"].markAsTouched();
    if (!this.archiveJobSearchForm.valid) return;

    this.jobService.archive_job_search(this.archiveJobSearchForm.value)
      .subscribe(respObj => {
        this.router.navigateByUrl('/jobs/description/' + respObj['results'][0]['id']);
      })
      if(!this.archiveJobSearchForm.invalid)
    {
      this.isCollapsed=!this.isCollapsed;
    }
  }
  ngOnInit() {
  }

}
