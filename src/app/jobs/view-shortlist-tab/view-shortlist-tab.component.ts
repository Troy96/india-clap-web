import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobsService } from 'src/app/services/jobs.service';

@Component({
  selector: 'app-view-shortlist-tab',
  templateUrl: './view-shortlist-tab.component.html',
  styleUrls: ['./view-shortlist-tab.component.css']
})
export class ViewShortlistTabComponent implements OnInit {

  jobId: number;
  shortlistedList: any[];

  constructor(
    private router: ActivatedRoute,
    private jobService: JobsService
  ) {
    this.jobId = +this.router.snapshot.paramMap.get('jobId');
  }

  ngOnInit() {
    this.getShortlisted();
  }

  getShortlisted() {
    this.jobService.get_shorlisted_candidates(this.jobId)
      .subscribe(respObj => {
        console.log(respObj);
        this.shortlistedList = [...respObj['results']];
      })
  }

}
