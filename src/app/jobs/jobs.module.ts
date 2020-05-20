import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
//  import { HttpModule } from '@angular/http';


import { JobsRoutingModule } from './jobs-routing.module';
import { JobsComponent } from './jobs.component';
import { AlertNoActiveJobComponent } from './alert-no-active-job/alert-no-active-job.component';
import { AppliedJobsComponent } from './applied-jobs/applied-jobs.component';
import { ArchiveJobsAlertComponent } from './archive-jobs-alert/archive-jobs-alert.component';
import { ArchiveJobSearchComponent } from './archive-job-search/archive-job-search.component';
import { SavedJobsComponent } from './saved-jobs/saved-jobs.component';
import { PostJobComponent } from './post-job/post-job.component';
import { UserAccountComponent } from './user-account/user-account.component';
import { ViewCandidatesComponent } from './view-candidates/view-candidates.component';
import { ViewShortlistTabComponent } from './view-shortlist-tab/view-shortlist-tab.component';
import { JobCardComponent } from './job-card/job-card.component';
import { JobDescriptionComponent } from './job-description/job-description.component';
import { JobPostEditComponent } from './job-post-edit/job-post-edit.component';
import { VariousSectorsJobsComponent } from './various-sectors-jobs/various-sectors-jobs.component';
import { VariousSectorsJobsFiltersComponent } from './various-sectors-jobs-filters/various-sectors-jobs-filters.component';
import { SkillTestComponent } from './skill-test/skill-test.component';
import { UploadResumeComponent } from './upload-resume/upload-resume.component';
import { SelectAllApplyComponent } from './select-all-apply/select-all-apply.component';
import { ProfileShareAlertComponent } from './profile-share-alert/profile-share-alert.component';
import { JobPostingsComponent } from './job-postings/job-postings.component';
import { InstantApplySearchComponent } from './instant-apply-search/instant-apply-search.component';
import { FavSaveApplyComponent } from './fav-save-apply/fav-save-apply.component';

import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JobsService } from '../services/jobs.service';
import { JwtTokenIntercelptor } from '../interceptors/jwt-token.interceptor';
import { CommunicateService } from '../services/communicate.service';
import { ProfileOverlayComponent } from './view-candidates/profile-overlay/profile-overlay.component';



@NgModule({
  declarations: [
    JobsComponent,
    AlertNoActiveJobComponent,
    AppliedJobsComponent,
    ArchiveJobSearchComponent,
    ArchiveJobSearchComponent,
    ArchiveJobsAlertComponent,
    SavedJobsComponent,
    PostJobComponent,
    UserAccountComponent,
    ViewCandidatesComponent,
    ViewShortlistTabComponent,
    JobCardComponent,
    JobDescriptionComponent,
    JobPostEditComponent,
    VariousSectorsJobsComponent,
    VariousSectorsJobsFiltersComponent,
    SkillTestComponent,
    UploadResumeComponent,
    SelectAllApplyComponent,
    ProfileShareAlertComponent,
    JobPostingsComponent,
    InstantApplySearchComponent,
    FavSaveApplyComponent,
    ProfileOverlayComponent
  ],
  imports: [
    CommonModule,
    JobsRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [JobsService, CommunicateService, {
    provide: HTTP_INTERCEPTORS, useClass: JwtTokenIntercelptor, multi: true
  }]
})
export class JobsModule { }
