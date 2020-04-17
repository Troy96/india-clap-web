import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NetworkingService } from 'src/app/services/networking.service';
import { MyprofileEditableService } from './myprofile-editable.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser'
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-my-profile-editable',
  templateUrl: './my-profile-editable.component.html',
  styleUrls: ['./my-profile-editable.component.css']
})
export class MyProfileEditableComponent implements OnInit {

  userId: number;
  userDetails: object;
  userConnections: any[] = [];
  videoUrl: SafeUrl;
  videoSizeError: any;

  constructor(
    private authService: AuthService,
    private netService: NetworkingService,
    private inputModal: MyprofileEditableService,
    private sanitizer: DomSanitizer,
    private notifService: NotificationService
  ) { }

  ngOnInit() {
    this.userId = JSON.parse(localStorage.getItem('currentUser'))['user_id'];
    this.getUserDetails();
  }

  getUserDetails() {
    this.authService.get_user_details(this.userId)
      .subscribe(respObj => {
        this.userDetails = { ...respObj }
        this.getConnectionDetailList();
      })
  }

  getConnectionDetailList() {
    for (let user of this.userDetails['connections']) {
      this.authService.get_user_details(5)
        .subscribe(respObj => {
          this.userConnections.push(respObj)
        })
    }
  }

  removeConnection(userId) {
    this.netService.remove_user_connection(userId)
      .subscribe(respobj => {
        this.getUserDetails();
      })
  }

  openEditModal(description) {
    this.inputModal.setInputModal(description, [{ test: 'a' }])
  }

  onVideoResumeUpload(event) {
    if (event.target.files && event.target.files.length) {
      let selectedFiles = event.target.files;
      let _file = selectedFiles[0];
      this.videoUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(_file));
    }
  }

  getVideoDuration(event) {
    const duration = event.target.duration;
    console.log(duration);
    if (duration > 30) this.notifService.showWarning('Video size larger than 30s', 'Try again');
  }

}
