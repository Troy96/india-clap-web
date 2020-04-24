import { Component, OnInit, Renderer2, ElementRef, ViewChild, Inject } from '@angular/core';
import { JobsService } from 'src/app/services/jobs.service';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
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
    private router: Router,private notifyService : NotificationService
  ) {
  }
  savedJob: any[]=[];
  jobList: any[]=[];
  toggleFilter: boolean = false;
  toggleInstantJobs: boolean = false;
  ngOnInit() {
    this.getVariousSectorsJobs();
  }

  getVariousSectorsJobs() {
    this.jobService.get_various_sectors_jobs()
      .subscribe(respObj => {
        this.jobList = respObj;
        this.getAllfavJobs();
      })
  }

  getAllfavJobs(){

  }
  displayJobFilters() {
    this.renderer.setStyle(this.filtersRef.nativeElement, 'display', 'block');
  }

  hideJobFilters(){
    this.renderer.setStyle(this.filtersRef.nativeElement, 'display', 'none'); 
  }

  onFavouriteJob(event, jobId) {
    event.target.src = `${this._document.location.origin}/assets/icons/1x/filled-star.png`;
    this.jobService.favourite_job(jobId)
      .subscribe(respObj => console.log(respObj))
  }
  onSavedJob(event, jobId) {
    this.notifyService.showSuccess('','Job added to saved list');
    this.savedJob.push(this.jobList);
    console.log(this.savedJob);
    event.target.src = `${this._document.location.origin}/assets/icons/1x/save-filled.png`;
    this.jobService.save_job(jobId)
      .subscribe(respObj => console.log(respObj))
  }
  onSelectAllAndApply() {
    this.jobService.select_all_jobs()
      .subscribe(respObj => {
        this.notifyService.showSuccess(respObj['detail'], 'Job Alert');
      })
  }

  getJobsByInstantApply() {
    this.toggleInstantJobs = !this.toggleInstantJobs;
    this.jobService.instant_apply_jobs(this.toggleInstantJobs)
      .subscribe(respObj => {
        this.jobList = [...respObj];
      })
  }

  getJobsByTitle() {
    this.jobService.get_jobs_by_titles()
      .subscribe(respObj => {
        this.jobList = [...respObj];
      })
  }

  getJobsByOpenings() {
    let filter = '';
    this.toggleFilter = !this.toggleFilter;
    (this.toggleFilter) ? filter = 'numOfOpenings' : filter = '-numOfOpenings';
    this.jobService.get_jobs_by_openings(filter)
      .subscribe(respObj => {
        this.jobList = [...respObj];
      })
  }

}
