import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { BannerComponent } from './banner/banner.component';
import { RouterModule } from '@angular/router';
import { InputModalComponent } from './input-modal/input-modal.component';



@NgModule({
  declarations: [
    NavbarComponent,
    BannerComponent,
    InputModalComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    NavbarComponent,
    BannerComponent
  ]
})
export class SharedModule { }
