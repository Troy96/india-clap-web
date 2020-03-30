import { Component, OnInit } from '@angular/core';
import { JobsService } from 'src/app/services/jobs.service';

@Component({
  selector: 'app-job-postings',
  templateUrl: './job-postings.component.html',
  styleUrls: ['./job-postings.component.css']
})
export class JobPostingsComponent implements OnInit {
  month:any;
  day:any;
  jobList:any=[];
  constructor(private jService:JobsService) { }

  ngOnInit() {
    var today = new Date();
       this.month = (today.getMonth()+1);
       this.day = today.getDate();
    // this.jService.get_jobList().subscribe((data:any)=>{
    //   this.jobList = data.results;
    //  // console.log(this.jobList)
    // })


    this.jService.myJobPostings().subscribe((data:any)=>{
      console.log(data);
      this.jobList = data.results;
    })
  }

}
