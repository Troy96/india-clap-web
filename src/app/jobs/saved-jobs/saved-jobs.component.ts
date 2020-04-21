import { Component, OnInit } from '@angular/core';
import { JobsService } from 'src/app/services/jobs.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-saved-jobs',
  templateUrl: './saved-jobs.component.html',
  styleUrls: ['./saved-jobs.component.css']
})
export class SavedJobsComponent implements OnInit {

  savedJobList: any[];
  jobDetailList: any[] = [];

  constructor(
    private jobService: JobsService,
    private _http: HttpClient
  ) { }

  ngOnInit() {
    this.getSavedJobs();
  }

  getSavedJobs() {
    this.jobService.get_saved_jobs()
      .subscribe(respObj => {
        this.savedJobList = [...respObj].map(obj => obj['saved_job']);
        this.getJobDetails();
      })
  }

  getJobDetails() {
    this.savedJobList.forEach(link => {
      this._http.get(link)
        .subscribe(respObj => {
          const companyId = respObj['company'];
          this.setJobDetailList(companyId, respObj)
        })
    })
  }

  setJobDetailList(id: number, jobDetails) {
    this.jobService.get_company_details(id)
      .subscribe(respObj => {
        this.jobDetailList.push({
          name: respObj['name'],
          ...jobDetails
        })
      })
  }

  unsaveJob(job) {
    console.log(job);
    this.jobService.unsave_job(job.id)
      .subscribe(respObj => {
        console.log(respObj)
      })
  }


}
