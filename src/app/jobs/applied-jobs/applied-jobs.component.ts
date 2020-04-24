import { Component, OnInit } from '@angular/core';
import { JobsService } from 'src/app/services/jobs.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-applied-jobs',
  templateUrl: './applied-jobs.component.html',
  styleUrls: ['./applied-jobs.component.css']
})
export class AppliedJobsComponent implements OnInit {

  appliedJobList: any=[];
  appliedJobDetailList: any[] = [];

  constructor(
    private http: HttpClient,
    private jobService: JobsService
  ) { }

  ngOnInit() {
    this.getAppliedJobs();
  }

  getAppliedJobs() {
    this.jobService.get_applied_jobs()
      .subscribe(respObj => {
        this.appliedJobList = [...respObj];
      })
  }

}
