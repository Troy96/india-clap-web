import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {
  ReactiveFormsModule,
  FormsModule
} from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SharedModule } from './shared/shared.module';
import { LayoutModule } from './layout/layout.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtTokenIntercelptor } from './interceptors/jwt-token.interceptor';
import { AuthGuard } from './guards/Auth.guard';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { NotificationService } from './services/notification.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TestComponent } from './test/test.component';
//  import { SocialLoginModule, AuthServiceConfig } from "angularx-social-login";
//  import { GoogleLoginProvider, FacebookLoginProvider } from "angularx-social-login";

// let config = new AuthServiceConfig([
//   {
//     id: GoogleLoginProvider.PROVIDER_ID,
//     provider: new GoogleLoginProvider("Google-OAuth-Client-Id")
//   },
//   {
//     id: FacebookLoginProvider.PROVIDER_ID,
//     provider: new FacebookLoginProvider("Facebook-App-Id")
//   }
// ]);
 
// export function provideConfig() {
//   return config;
// }
@NgModule({
  declarations: [
    AppComponent,
    TestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    LayoutModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
   //  SocialLoginModule
  ],
  providers: [AuthGuard, {
    provide: HTTP_INTERCEPTORS, useClass: JwtTokenIntercelptor, multi: true
  }, 
  // {
  //   provide: AuthServiceConfig,
  //   useFactory: provideConfig
  // }

  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
