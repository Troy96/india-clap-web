import { Component, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobsService } from 'src/app/services/jobs.service';

@Component({
  selector: 'app-job-description',
  templateUrl: './job-description.component.html',
  styleUrls: ['./job-description.component.css']
})
export class JobDescriptionComponent implements OnInit {

  jobId: number;
  jobObj: any;
  obj:any={};
  @ViewChild('profileShare', { static: false }) profileShareRef: ElementRef;
  constructor(
    private route: ActivatedRoute,
    private jobService: JobsService,
    private renderer: Renderer2
  ) {

    this.jobId = Number(this.route.snapshot.paramMap.get('jobId'));
    this.getJobDetails(this.jobId);


  }

  getJobDetails(jobId: number) {
    this.jobService.get_job_description(jobId)
      .subscribe(respObj => {
        this.jobObj = { ...respObj };
      })
  }

  apply() {
    this.renderer.setStyle(this.profileShareRef.nativeElement, 'display', 'block');
    this.obj.id = this.jobId;
    this.jobService.apply_to_job(this.jobId,this.obj).subscribe((data:any)=>{
    console.log(data);
    })
  }


  ngOnInit() {
  }

}
