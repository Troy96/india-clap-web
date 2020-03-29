import { Component, OnInit } from '@angular/core';
import { JobsService } from 'src/app/services/jobs.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-candidates',
  templateUrl: './view-candidates.component.html',
  styleUrls: ['./view-candidates.component.css']
})
export class ViewCandidatesComponent implements OnInit {

  jobId: number;
  candidateList: any[];

  constructor(
    private router: ActivatedRoute,
    private jobService: JobsService
  ) {
    this.jobId = +this.router.snapshot.paramMap.get('jobId');
  }

  ngOnInit() {
    this.getCandidates();
  }

  getCandidates() {
    this.jobService.get_job_candidates(this.jobId)
      .subscribe(respObj => {
        console.log(respObj);
        this.candidateList = [...respObj['results']];
      })

  }

}
