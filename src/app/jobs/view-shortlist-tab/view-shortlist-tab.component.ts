import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JobsService } from 'src/app/services/jobs.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-view-shortlist-tab',
  templateUrl: './view-shortlist-tab.component.html',
  styleUrls: ['./view-shortlist-tab.component.css']
})
export class ViewShortlistTabComponent implements OnInit {

  jobId: number;
  shortlistedList: any = [];

  constructor(
    private router: ActivatedRoute,
    private jobService: JobsService,
    private _router: Router,
    private notifService: NotificationService
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
        this.shortlistedList = respObj;
      })
  }
  changeJobStatus(state, postId, candidateId) {
    this.jobService.change_job_application_state(postId, candidateId, state)
      .subscribe(respObj => {
        this.notifService.showSuccess(`You ${state}ed the candidate`, 'job alert')
        this.ngOnInit();
      })
  }
  applicantProfile(id) {
    console.log(id);
    let _url = '/professional-networking/users/' + id;
    this._router.navigate([_url])
  }
}
