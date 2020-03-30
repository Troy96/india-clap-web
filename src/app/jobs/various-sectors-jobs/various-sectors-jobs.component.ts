import { Component, OnInit, Renderer2, ElementRef, ViewChild, Inject } from '@angular/core';
import { JobsService } from 'src/app/services/jobs.service';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-various-sectors-jobs',
  templateUrl: './various-sectors-jobs.component.html',
  styleUrls: ['./various-sectors-jobs.component.css']
})
export class VariousSectorsJobsComponent implements OnInit {

  @ViewChild('filters', { static: false }) filtersRef: ElementRef
  constructor(
    @Inject(DOCUMENT) private _document: Document,
    private jobService: JobsService,
    private renderer: Renderer2,
    private router: Router
  ) {
  }

  jobList: any[];
  obj:any={};
  ngOnInit() {
    this.getVariousSectorsJobs();
  }

  getVariousSectorsJobs() {
    this.jobService.get_various_sectors_jobs()
      .subscribe(respObj => {
        this.jobList = [...respObj['results']];
      })
  }

  displayJobFilters() {
    this.renderer.setStyle(this.filtersRef.nativeElement, 'display', 'block');
  }

  onFavouriteJob(event, jobId) {
    event.target.src = `${this._document.location.origin}/assets/icons/1x/filled-star.png`;
    this.obj.id = jobId;
    this.jobService.save_job(jobId,this.obj)
      .subscribe(respObj => console.log(respObj))
  }

  onSelectAllAndApply() {
    this.jobService.select_all_jobs()
      .subscribe(respObj => console.log(respObj))
  }

}
