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
  userDetails: any;
  userConnections: any[] = [];

  videoFile: any;
  imageFile: any;
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
    this.userConnections = [];
    this.userId = JSON.parse(localStorage.getItem('currentUser'))['user_id'];
    this.getUserDetails();
    this.inputModal.toRefreshDetails$.subscribe(toRefresh => {
      if(toRefresh) this.getUserDetails();
    })
  }

  getUserDetails() {
    this.userConnections = [];
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
        //this.getUserDetails();
      })
  }

  openAddModal(description) {
    this.inputModal.setInputModal(description, true, null)
  }

  openEditModal(description, data) {
    this.inputModal.setInputModal(description, false, data);
  }

  onVideoResumeUpload(event) {
    if (event.target.œfiles && event.target.files.length) {
      let selectedFiles = event.target.files;
      this.videoFile = selectedFiles[0];
      if (!this.videoFile.type.includes('video')) return this.notifService.showWarning('Not a video file', 'Try again with a video file');
      this.videoUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(this.videoFile));
    }
  }

  validateVideoDuration(event) {
    const duration = event.target.duration;
    if (duration > 30) this.notifService.showWarning('Video size larger than 30s', 'Try again');
    this.uploadVideoResume();
  }

  uploadVideoResume() {
    this.authService.upload_user_video_resume(this.userId, this.videoFile)
      .subscribe(_ => {
        this.notifService.showSuccess('Video uploaded successfully', 'profile Alert');
      })
  }

  onPhotoUpload(event) {
    if (event.target.files && event.target.files.length) {
      let selectedFiles = event.target.files;
      this.imageFile = selectedFiles[0];

      this.authService.upload_user_photo(this.userId, this.imageFile)
        .subscribe(_ => {
          this.notifService.showSuccess('Photo changed successfully', 'Profile Alert')
        })

    }
  }

}
