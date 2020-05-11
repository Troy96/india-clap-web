import { Component, OnInit, Renderer2, ElementRef, ViewChild, Inject } from '@angular/core';
import { JobsService } from 'src/app/services/jobs.service';
import { DOCUMENT } from '@angular/common';
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
    private notifService: NotificationService
    
  ) {
  }
  
  jobList: any[] = [];
  toggleFilter: boolean = false;
  toggleInstantJobs: boolean = false;
  favouriteJobMap: Map<number, boolean> = new Map();
  savedJobMap:Map<number, boolean> = new Map();
  jobType:string='Active';
  searchText:any="";
  jobFilters:any={};
  jobSort:number=0;
  ngOnInit() {
    this.jobType='Active'
    this.jobService.queryJobList$
      .subscribe(jobSearchList => {
        if (!jobSearchList.length) {
          this.getVariousSectorsJobs();
        }
        else {
          this.jobList = jobSearchList;
        }
        this.getAllfavJobs();
        this.getAllsaveJobs();
      })
  }

  getVariousSectorsJobs() {
    this.jobService.get_various_sectors_jobs()
      .subscribe(respObj => {
        this.jobList = respObj;
        this.getAllfavJobs();
        this.getAllsaveJobs();
      })
  }

  displayJobFilters() {
    this.renderer.setStyle(this.filtersRef.nativeElement, 'display', 'block');
  }

  hideJobFilters() {
    this.renderer.setStyle(this.filtersRef.nativeElement, 'display', 'none');
  }

  onFavouriteJob(event, jobId) {
    event.target.src = `${this._document.location.origin}/assets/icons/1x/filled-star.png`;
    this.jobService.favourite_job(jobId)
      .subscribe(respObj => console.log(respObj))
  }

  onUnFavouriteJob(event, jobId) {
    event.target.src = `${this._document.location.origin}/assets/icons/1x/star.png`;
    this.jobService.un_favourite_job(jobId)
      .subscribe(respObj => console.log(respObj))
  }

  getAllfavJobs() {
    this.jobService.get_favourite_jobs().subscribe(respObj => {
      respObj.map(job => {
        let temp = job.favourite_job.split('/');
        let jobId = temp[temp.length - 2];
        this.favouriteJobMap.set(jobId, true)
      })
      this.sortJobsAsFav();
    })
  }

  sortJobsAsFav() {
    this.jobList.map(job => {
      if (this.favouriteJobMap.has(job.id.toString())) {
        job['isFav'] = true;
      }
      else job['isFav'] = false;
    })
  }

  onSaveJob(event, jobId) {
    event.target.src = `${this._document.location.origin}/assets/icons/1x/bookmark_fill.png`;
    this.jobService.save_job(jobId)
      .subscribe(respObj => console.log(respObj))
  }

  onUnSaveJob(event, jobId) {
    event.target.src = `${this._document.location.origin}/assets/icons/1x/save.png`;
    this.jobService.unsave_job(jobId)
      .subscribe(respObj => console.log(respObj))
  }

  getAllsaveJobs() {
    this.jobService.get_saved_jobs().subscribe(respObj => {
      respObj.map(job => {
      //  console.log(job);
        let temp = job.saved_job.split('/');
        let jobId = temp[temp.length - 2];
        this.savedJobMap.set(jobId, true)
      })
      this.sortJobsAsSave();
    })
  }
  sortJobsAsSave() {
    this.jobList.map(job => {
      if (this.savedJobMap.has(job.id.toString())) {
        job['isSaved'] = true;
      }
      else job['isSaved'] = false;
    })
  }

  onSelectAllAndApply() {
    
    this.jobService.select_all_jobs()
      .subscribe(respObj => {
        this.notifService.showSuccess(respObj['detail'], 'Job Alert');
      })
  }

  getJobsByInstantApply() {
    this.jobFilters={}

    this.jobType='Instant';

    this.toggleInstantJobs = !this.toggleInstantJobs;
    console.log(this.toggleInstantJobs)
    this.jobService.instant_apply_jobs(this.toggleInstantJobs)
      .subscribe(respObj => {
        this.jobList = [...respObj];
      })
  }
  getJobsByActive(){
    this.jobFilters={}

    this.jobType='Active';
    this.jobFilters.jobType=this.jobType;
    if(this.searchText&&this.searchText!='')
    this.jobFilters.searchText=this.searchText;
    if(this.jobSort==1)
    this.jobFilters.ordering="job_title";
    if(this.jobSort==2)
    this.jobFilters.ordering="numOpenings"
    this.jobService.get_jobs_by_filters(this.jobFilters).subscribe(respObj => {
      this.jobList = [...respObj];
      this.hideJobFilters();
      this.getAllsaveJobs();
      this.getAllfavJobs();
    })
  }
  getJobsByArchive(){
    console.log(this.jobFilters)
    this.jobFilters={}

    this.jobType='Archive';
    this.jobFilters.jobType=this.jobType;
    if(this.searchText&&this.searchText!='')
    this.jobFilters.searchText=this.searchText;
    if(this.jobSort==1)
    this.jobFilters.ordering="job_title";
    if(this.jobSort==2)
    this.jobFilters.ordering="numOpenings"
    this.jobService.get_jobs_by_filters(this.jobFilters).subscribe(respObj => {
      this.jobList = [...respObj];
      this.hideJobFilters();
      this.getAllsaveJobs();
      this.getAllfavJobs();
    })
  }
  getJobsByInstant(){
    this.jobFilters={}

    this.jobType='Instant';
    this.jobFilters.jobType=this.jobType;
    if(this.searchText&&this.searchText!='')
    this.jobFilters.searchText=this.searchText;
    if(this.jobSort==1)
    this.jobFilters.ordering="job_title";
    if(this.jobSort==2)
    this.jobFilters.ordering="numOpenings"
    // this.jobService.instant_apply_jobs(this.toggleInstantJobs)
    //   .subscribe(respObj => {
    //     this.jobList = [...respObj];
    //   })
    console.log(this.jobFilters)
    this.jobService.get_jobs_by_filters(this.jobFilters).subscribe((respObj:any) => {
      this.jobList = [...respObj];
      this.hideJobFilters();
      this.getAllsaveJobs();
      this.getAllfavJobs();
    })
  }

  getJobsByTitle() {
    this.jobFilters={}

    this.jobSort=1;
    this.jobFilters.jobType=this.jobType;
    if(this.searchText&&this.searchText!='')
    this.jobFilters.searchText=this.searchText;
    if(this.jobSort==1)
    this.jobFilters.ordering="job_title";
    if(this.jobSort==2)
    this.jobFilters.ordering="numOpenings"
    // this.jobService.get_jobs_by_titles()
    //   .subscribe(respObj => {
    //     this.jobList = [...respObj];
    //     this.hideJobFilters();
    //   })
    this.jobService.get_jobs_by_filters(this.jobFilters).subscribe(respObj => {
      this.jobList = [...respObj];
      this.hideJobFilters();
      this.getAllsaveJobs();
      this.getAllfavJobs();
    })
  }

  getJobsByOpenings() {
    this.jobFilters={}

    this.jobSort=2;
    this.jobFilters.jobType=this.jobType;
    if(this.searchText&&this.searchText!='')
    this.jobFilters.searchText=this.searchText;
    if(this.jobSort==1)
    this.jobFilters.ordering="job_title";
    if(this.jobSort==2)
    this.jobFilters.ordering="numOpenings"
    let filter = '';
    this.toggleFilter = !this.toggleFilter;
    (this.toggleFilter) ? filter = 'numOfOpenings' : filter = '-numOfOpenings';
    // this.jobService.get_jobs_by_openings(filter)
    //   .subscribe(respObj => {
    //     this.jobList = [...respObj];
    //     this.hideJobFilters();

    //   })
      // this.jobFilters.jobType=this.jobType;
      // if(this.searchText&&this.searchText!='')
      // this.jobFilters.searchText=this.searchText;
      // if(this.jobSort==1)
      // this.jobFilters.ordering="job_title";
      // if(this.jobSort==2)
    //  this.jobFilters.ordering="numOpenings";
    this.jobFilters.filter=filter;
      this.jobService.get_jobs_by_filters(this.jobFilters).subscribe(respObj => {
        this.jobList = [...respObj];
        this.hideJobFilters();
        this.getAllsaveJobs();
        this.getAllfavJobs();     
       })
  }
  jobsBySearch(){
    this.jobFilters={}
  console.log(this.searchText)
  if(this.searchText!='')
  {
    this.jobFilters.jobType=this.jobType;
    if(this.searchText&&this.searchText!='')
    this.jobFilters.searchText=this.searchText;
    if(this.jobSort==1)
    this.jobFilters.ordering="job_title";
    if(this.jobSort==2)
    this.jobFilters.ordering="numOpenings"
    this.jobService.get_jobs_by_filters(this.jobFilters).subscribe(respObj => {
      this.jobList = [...respObj];
      this.hideJobFilters();
      this.getAllsaveJobs();
      this.getAllfavJobs();
    })
  }
  else{
    
    this.ngOnInit();
  }

  }

}
