import { Component, OnInit } from '@angular/core';
import { JobsService } from 'src/app/services/jobs.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-view-candidates',
  templateUrl: './view-candidates.component.html',
  styleUrls: ['./view-candidates.component.css']
})
export class ViewCandidatesComponent implements OnInit {

  jobId: number;
  candidateList: any = [];
  candidateDetailList: any[];

  constructor(
    private router: ActivatedRoute,
    private jobService: JobsService,
    private http: HttpClient, private _router: Router,
    private notifService: NotificationService
  ) {
    this.jobId = +this.router.snapshot.paramMap.get('jobId');
  }

  ngOnInit() {
    this.getCandidates();
  }

  getCandidates() {
    this.jobService.get_job_candidates(this.jobId)
      .subscribe(respObj => {
        //  console.log(respObj);
        this.candidateList = respObj;
        console.log(this.candidateList)
        this.candidateList.forEach(obj => {
          this.getCandidateDetails(obj['applicant'])
        })
      })
  }

  getCandidateDetails(url: string) {
    this.http.get(url)
      .subscribe(respObj => {
        console.log(respObj);
      })
  }

  changeJobStatus(state, postId, candidateId) {
    this.jobService.change_job_application_state(postId, candidateId, state)
      .subscribe(respObj => {
        this.notifService.showSuccess(`You ${state}ed the candidate!`, 'alert');
        console.log(respObj);
        this.ngOnInit();
      })
  }

  applicantProfile(id) {
    let _url = '/in/users/' + id;
    this._router.navigate([_url])
  }

}
