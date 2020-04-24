import { Component, OnInit } from '@angular/core';
import { JobsService } from 'src/app/services/jobs.service';

@Component({
  selector: 'app-job-postings',
  templateUrl: './job-postings.component.html',
  styleUrls: ['./job-postings.component.css']
})
export class JobPostingsComponent implements OnInit {

  jobPostsList: any = [];
  constructor(private jobService: JobsService) { }

  ngOnInit() {
    this.getJobPostings();
  }

  getJobPostings() {
    this.jobService.get_job_postings()
      .subscribe(respObj => {
        console.log(respObj);
        this.jobPostsList = respObj;
      })
  }

}
