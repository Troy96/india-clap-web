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
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './guards/Auth.guard';

@NgModule({
  declarations: [
    AppComponent,
     
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    LayoutModule,
    HttpClientModule,
     
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
