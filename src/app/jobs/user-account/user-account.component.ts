import { Component, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css']
})
export class UserAccountComponent implements OnInit {

  @ViewChild('message', { static: false }) messageRef: ElementRef;
  constructor(
    private renderer: Renderer2,
    private router: Router
  ) { }

  ngOnInit() {
  }
  jobSearch() {
    this.router.navigate(['/jobs/jobs-card'])
  }
  archiveJobSearch() {
    this.router.navigate(['/jobs/archive-job-search'])
  }
  skillCourseSearch() {
    this.router.navigate(['/offline-learning/skill-courses-results'])
  }

  showArchiveJobAlert() {
    this.renderer.setStyle(this.messageRef.nativeElement, 'display', 'block');
  }

}

