import { Component, OnInit, Input } from '@angular/core';
import { JobsService } from 'src/app/services/jobs.service';
import { HttpClient } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';


@Component({
  selector: 'app-saved-jobs',
  templateUrl: './saved-jobs.component.html',
  styleUrls: ['./saved-jobs.component.css']
})
export class SavedJobsComponent implements OnInit {

  @Input() savedJobList: any[] =[];
  jobDetailList: any[] = [];
  favouriteJobMap: Map<number, boolean> = new Map();

  constructor(
    @Inject(DOCUMENT) private _document: Document,
    private jobService: JobsService,
    private _http: HttpClient,
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
          this.jobDetailList.push(respObj)
        })
    })
    setTimeout(() => {
      this.getFavouriteJobs();
    }, 1500);
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
    this.jobService.unsave_job(job.id)
      .subscribe(respObj => {
        console.log(respObj)
      })
  }

  favouriteJob(e, job) {
    e.target.src = `${this._document.location.origin}/assets/icons/1x/bookmark_fill.png`;
    this.jobService.favourite_job(job.id)
      .subscribe(respObj => {
        console.log(respObj)
      })
  }

  getFavouriteJobs() {
    this.jobService.get_favourite_jobs()
      .subscribe(respObj => {
        respObj.map(job => {
          let temp = job.favourite_job.split('/');
          let jobId = temp[temp.length - 2];
          this.favouriteJobMap.set(jobId, true)
        })
        this.sortJobsAsFav();
      })
  }

  onUnFavouriteJob(event, jobId) {
    event.target.src = `${this._document.location.origin}/assets/icons/1x/bookmark_empty.png`;
    this.jobService.un_favourite_job(jobId)
      .subscribe(respObj => console.log(respObj))
  }

  sortJobsAsFav() {
    this.jobDetailList.map(job => {
      if (this.favouriteJobMap.has(job.id.toString())) {
        job['isFav'] = true;
      }
      else job['isFav'] = false;
    })
  }


}
