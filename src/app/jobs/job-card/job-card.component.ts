import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-job-card',
  templateUrl: './job-card.component.html',
  styleUrls: ['./job-card.component.css']
})
export class JobCardComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }
  toJobacrossvarioussectors(){
     this.router.navigate(['/jobs/various-sectors'])
   }
   toCustomjobsearches()
   {
    this.router.navigate(['/jobs/instant-apply-search'])
   }
}
