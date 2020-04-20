import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { JobsService } from 'src/app/services/jobs.service';
import { CommunicateService } from 'src/app/services/communicate.service';

@Component({
  selector: 'app-instant-apply-search',
  templateUrl: './instant-apply-search.component.html',
  styleUrls: ['./instant-apply-search.component.css']
})
export class InstantApplySearchComponent implements OnInit {

  isCollapsed:boolean=true;
  instantApplyForm: FormGroup;
  constructor(
    private jobService: JobsService,
    private communicateService: CommunicateService
  ) {
    this.instantApplyForm = new FormGroup({
      salary: new FormControl("", Validators.required),
      location_State: new FormControl("", Validators.required),
      location_District: new FormControl("", Validators.required),
      starting_time: new FormControl("", Validators.required),
      end_time: new FormControl("", Validators.required),
    });
  }
  submit() {
    this.instantApplyForm.controls["salary"].markAsTouched();
    this.instantApplyForm.controls["location_State"].markAsTouched();
    this.instantApplyForm.controls["location_District"].markAsTouched();
    this.instantApplyForm.controls["starting_time"].markAsTouched();
    this.instantApplyForm.controls["end_time"].markAsTouched();
    if (!this.instantApplyForm.valid) 
    return this.jobService.search_job(this.instantApplyForm.value)
      .subscribe(respObj => {
        this.communicateService.jobList = [...respObj['results']];
      })
    if(!this.instantApplyForm.invalid)
    {
      this.isCollapsed=!this.isCollapsed;
    }
  }

  ngOnInit() {
  }

}
