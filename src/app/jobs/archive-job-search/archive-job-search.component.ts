import { Component, OnInit, Renderer2, ElementRef, ViewChild, Inject  } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { JobsService } from 'src/app/services/jobs.service';
import { NotificationService } from 'src/app/services/notification.service';
import { DOCUMENT } from '@angular/common';
@Component({
  selector: 'app-archive-job-search',
  templateUrl: './archive-job-search.component.html',
  styleUrls: ['./archive-job-search.component.css']
})
export class ArchiveJobSearchComponent implements OnInit {

  @ViewChild('filters', { static: false }) filtersRef: ElementRef
  constructor(
    @Inject(DOCUMENT) private _document: Document,

    private jobService: JobsService,
    private renderer: Renderer2,
    private notifService: NotificationService

  ) {
  }

  jobList: any=[] ;
  toggleFilter: boolean = false;
  toggleInstantJobs: boolean = false;
  favouriteJobMap: Map<number, boolean> = new Map();

  ngOnInit() {
    // this.jobService.queryJobList$
    //   .subscribe(jobSearchList => {
    //     if (!jobSearchList.length) {
    //       this.getVariousSectorsJobs();
    //     }
    //     else {
    //       this.jobList = jobSearchList;
    //     }
    //     this.getAllfavJobs();
    //   })
    this.jobService.all_archive_jobs().subscribe((data)=>{
      this.jobList=data;
    })
  }

  getVariousSectorsJobs() {
    this.jobService.get_various_sectors_jobs()
      .subscribe(respObj => {
        this.jobList = respObj;
        this.getAllfavJobs();
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

  onSelectAllAndApply() {
    this.jobService.select_all_jobs()
      .subscribe(respObj => {
        this.notifService.showSuccess(respObj['detail'], 'Job Alert');
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

 // archiveJobSearchForm: FormGroup;

  // constructor(
  //   private fb: FormBuilder,
  //   private router: Router,
  //   private jobService: JobsService
  // ) {
  //   this.archiveJobSearchForm = new FormGroup({
  //     month: new FormControl("", Validators.required),
  //     job_title: new FormControl("", Validators.required),

  //   });
  // }
  // submit() {
  //   this.archiveJobSearchForm.controls["month"].markAsTouched();
  //   this.archiveJobSearchForm.controls["job_title"].markAsTouched();
  //   if (!this.archiveJobSearchForm.valid) return;

  //   this.jobService.archive_job_search(this.archiveJobSearchForm.value)
  //     .subscribe(respObj => {
  //       this.router.navigateByUrl('/jobs/description/' + respObj['results'][0]['id']);
  //     })

  // }
  // ngOnInit() {
  // }

}
