import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-job-post-edit',
  templateUrl: './job-post-edit.component.html',
  styleUrls: ['./job-post-edit.component.css']
})
export class JobPostEditComponent implements OnInit {

  jobId: number;

  constructor(
    private router: ActivatedRoute
  ) {
    this.jobId = +this.router.snapshot.paramMap.get('jobId');
  }

  ngOnInit() {
  }

}
