import { Component, OnInit } from '@angular/core';
import { JobsService } from 'src/app/services/jobs.service';

@Component({
  selector: 'app-saved-jobs',
  templateUrl: './saved-jobs.component.html',
  styleUrls: ['./saved-jobs.component.css']
})
export class SavedJobsComponent implements OnInit {

  savedJobList: any[];

  constructor(
    private jobService: JobsService
  ) { }

  ngOnInit() {
    this.getSavedJobs();
  }

  getSavedJobs() {
    this.jobService.get_saved_jobs()
      .subscribe(respObj => {
        this.savedJobList = [...respObj['results']];
        console.log(this.savedJobList);
      })
  }

}
