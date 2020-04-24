import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JobsService } from 'src/app/services/jobs.service';

@Component({
  selector: 'app-view-shortlist-tab',
  templateUrl: './view-shortlist-tab.component.html',
  styleUrls: ['./view-shortlist-tab.component.css']
})
export class ViewShortlistTabComponent implements OnInit {

  jobId: number;
  shortlistedList: any=[];

  constructor(
    private router: ActivatedRoute,
    private jobService: JobsService,private _router:Router
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
  changeJobStatus(state,postId,candidateId) {
    //  let postId = 0, candidateId = 0
      this.jobService.change_job_application_state(postId, candidateId, state)
        .subscribe(respObj => {
          console.log(respObj);
          this.ngOnInit();
        })
    }
    applicantProfile(id)
    {
      console.log(id);
     let _url = '/professional-networking/users/'+id;
      this._router.navigate([_url])
    }
}
