import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { ProfessionalNetworkingRoutingModule } from './professional-networking-routing.module';

import { ProfessionalNetworkingComponent } from './professional-networking.component';
import { AcceptDeclineRequestComponent } from './accept-decline-request/accept-decline-request.component';
import { ForgotPasswordPageComponent } from './forgot-password-page/forgot-password-page.component';
import { MyProfileDropdownComponent } from './my-profile-dropdown/my-profile-dropdown.component';
import { NotificationDropdownComponent } from './notification-dropdown/notification-dropdown.component';
import { ResetPasswordPageComponent } from './reset-password-page/reset-password-page.component';
import { SomeoneElseProfileComponent } from './someone-else-profile/someone-else-profile.component';
import { TimelineLikeReactComponent } from './timeline-like-react/timeline-like-react.component';
import { SharedModule } from '../shared/shared.module';
import { TimelineCommentComponent } from './timeline-comment/timeline-comment.component';
import { TimelineReactEmojiComponent } from './timeline-react-emoji/timeline-react-emoji.component';
import { MyProfileEditableComponent } from './my-profile-editable/my-profile-editable.component';
import { PrivacySettingsComponent } from './privacy-settings/privacy-settings.component';
import { CompanyManagementComponent } from './company-management/company-management.component';
import { CreateCompanyComponent } from './create-company/create-company.component';
import { CompanyAdminViewComponent } from './company-admin-view/company-admin-view.component';
import { CompanyUserViewComponent } from './company-user-view/company-user-view.component';
import { MoreTabComponent } from './more-tab/more-tab.component';
import { NetworkingService } from '../services/networking.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtTokenIntercelptor } from '../interceptors/jwt-token.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JobsService } from '../services/jobs.service';
import { MynetworkComponent } from './mynetwork/mynetwork.component';
import { ContactInfoComponent } from './my-profile-editable/contact-info/contact-info.component';
import { ContactUsElseComponent } from './someone-else-profile/contact-us-else/contact-us-else/contact-us-else.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { FeedPostComponent } from './timeline-like-react/feed-post/feed-post.component';
import { ProjectComponent } from './my-profile-editable/modals/project/project.component';
import { ProjectEditComponent } from './my-profile-editable/modals/project-edit/project-edit.component';
import { CertificateComponent } from './my-profile-editable/modals/certificate/certificate.component';
import { CertificateEditComponent } from './my-profile-editable/modals/certificate-edit/certificate-edit.component';
import { SkillComponent } from './my-profile-editable/modals/skill/skill.component';
import { SkillEditComponent } from './my-profile-editable/modals/skill-edit/skill-edit.component';


@NgModule({
  declarations: [
    ProfessionalNetworkingComponent,
    AcceptDeclineRequestComponent,
    ForgotPasswordPageComponent,
    MyProfileDropdownComponent,
    NotificationDropdownComponent,
    ResetPasswordPageComponent,
    SomeoneElseProfileComponent,
    TimelineLikeReactComponent,
    TimelineCommentComponent,
    TimelineReactEmojiComponent,
    MyProfileEditableComponent,
    PrivacySettingsComponent,
    CompanyManagementComponent,
    CreateCompanyComponent,
    CompanyAdminViewComponent,
    CompanyUserViewComponent,
    MoreTabComponent,
    MynetworkComponent,
    ContactInfoComponent,
    ContactUsElseComponent,
    NotificationsComponent,
    FeedPostComponent,
    ProjectComponent,
    ProjectEditComponent,
    CertificateComponent,
    CertificateEditComponent,
    SkillComponent,
    SkillEditComponent
  ],
  imports: [
    CommonModule,
    ProfessionalNetworkingRoutingModule,
    SharedModule,
    FormsModule, ReactiveFormsModule,
    HttpClientModule,
    Ng2SearchPipeModule
  ],
  providers: [NetworkingService, JobsService, {
    provide: HTTP_INTERCEPTORS, useClass: JwtTokenIntercelptor, multi: true
  }]
})
export class ProfessionalNetworkingModule { }
