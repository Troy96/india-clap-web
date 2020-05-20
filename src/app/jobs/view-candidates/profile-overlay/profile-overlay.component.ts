import { Component, OnInit } from '@angular/core';
import { ProfileOverlayService } from '../profile-overlay.service';
import { AuthServices } from 'src/app/services/auth.service';
import { SafeStyle, DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-profile-overlay',
  templateUrl: './profile-overlay.component.html',
  styleUrls: ['./profile-overlay.component.css']
})
export class ProfileOverlayComponent implements OnInit {

  userDetails: any;
  userId: number;
  coverImgStyle: SafeStyle;


  constructor(
    private _profile: ProfileOverlayService,
    private authService: AuthServices,
    private sanitizer: DomSanitizer,

  ) { }

  ngOnInit() {
    this._profile.profileOverlay$
      .subscribe(
        data => {
          if (!data) return;
          this.userId = data.userId;
          this.getUserDetails();
        }
      )
  }

  getUserDetails() {
    this.authService.get_user_details(this.userId)
      .subscribe(respObj => {
        this.userDetails = { ...respObj };
        this.setinitCover();
        console.log(this.userDetails);
      })
  }

  setinitCover() {
    if (!this.userDetails.cover_photo) {
      this.coverImgStyle = this.getSanitizedPhoto(`background-image: url("./assets/icons/1x/Asset 2.png")`);
    }
    else {
      this.coverImgStyle = this.getSanitizedPhoto(`background-image: url(${this.userDetails.cover_photo}`);
    }
  }

  getSanitizedPhoto(photoUrl: string) {
    return this.sanitizer.bypassSecurityTrustStyle(photoUrl);
  }

}
