import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipModule } from 'ng2-tooltip-directive'
import { NavbarComponent } from './navbar/navbar.component';
import { BannerComponent } from './banner/banner.component';
import { RouterModule } from '@angular/router';
import { InputModalComponent } from './input-modal/input-modal.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InviteByEmailComponent } from './invite-by-email/invite-by-email.component';
import { ImportContactComponent } from './import-contact/import-contact.component';
import { InviteContactComponent } from './invite-contact/invite-contact.component';
// import { SocialLoginModule, AuthServiceConfig } from "angularx-social-login";
// import { GoogleLoginProvider, FacebookLoginProvider } from "angularx-social-login";

// let config = new AuthServiceConfig([
//   // {
//   //   id: GoogleLoginProvider.PROVIDER_ID,
//   //   provider: new GoogleLoginProvider("Google-OAuth-Client-Id")
//   // },
//   {
//     id: FacebookLoginProvider.PROVIDER_ID,
//     provider: new FacebookLoginProvider("263975811401576")
//   }
// ]);
 
// export function provideConfig() {
//   return config;
// }



@NgModule({
  declarations: [
    NavbarComponent,
    BannerComponent,
    InputModalComponent,
    InviteByEmailComponent,
    ImportContactComponent,
    InviteContactComponent,
    
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    TooltipModule,
    //SocialLoginModule
  ],
  exports: [
    NavbarComponent,
    BannerComponent,
    InputModalComponent
  ],
  providers:[
    // {
    //   provide: AuthServiceConfig,
    //   useFactory: provideConfig
    // }
  ]
})
export class SharedModule { }
