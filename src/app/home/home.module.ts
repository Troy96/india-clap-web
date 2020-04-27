import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegistrationPageComponent } from './registration-page/registration-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { NotificationService } from '../services/notification.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtTokenIntercelptor } from '../interceptors/jwt-token.interceptor';
//import { SocialLoginModule, AuthServiceConfig } from "angularx-social-login";
//import { GoogleLoginProvider, FacebookLoginProvider } from "angularx-social-login";

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
    HomeComponent,
    LoginPageComponent,
    RegistrationPageComponent,
    HomePageComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
   // SocialLoginModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtTokenIntercelptor, multi: true },
    // {
    //   provide: AuthServiceConfig,
    //   useFactory: provideConfig
    // }
  ]
})
export class HomeModule { }
