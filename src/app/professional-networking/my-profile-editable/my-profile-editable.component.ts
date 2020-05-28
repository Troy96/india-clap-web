import { Component, OnInit, ViewChild, ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import { AuthServices } from 'src/app/services/auth.service';
import { NetworkingService } from 'src/app/services/networking.service';
import { MyprofileEditableService } from './myprofile-editable.service';
import { DomSanitizer, SafeUrl, SafeStyle } from '@angular/platform-browser'
import { NotificationService } from 'src/app/services/notification.service';
import { ContactInfoService } from './contact-info/contact-info.service';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { ProjectService } from './modals/project/project.service';
import { ProjectEditService } from './modals/project-edit/project-edit.service';

@Component({
  selector: 'app-my-profile-editable',
  templateUrl: './my-profile-editable.component.html',
  styleUrls: ['./my-profile-editable.component.css']
})
export class MyProfileEditableComponent implements OnInit, AfterViewInit {
  activityArray:any=[];
  userId: number;
  profileId: number;
  userDetails: any;
  userConnections: any[] = [];
  showCover: Boolean = true;
  videoFile: any;
  imageFile: any;
  coverFile: any;
  companyLogoFile: any;
  educationLogoFile: any;
  projectLogoFile:any;
  videoUrl: SafeUrl;
  videoSizeError: any;
  companiesFollowedArray:any=[];
  coverImgStyle: SafeStyle;
  showPdf:boolean=false;
  isLoading: boolean = true;

  @ViewChild('coverImg', { static: true }) coverImgRef: ElementRef;
  @ViewChild('Profile_pdf', {static: false}) Profile_pdf: ElementRef;

  constructor(
    private authService: AuthServices,
    private netService: NetworkingService,
    private inputModal: MyprofileEditableService,
    private sanitizer: DomSanitizer,
    private notifService: NotificationService,
    public contactInfo: ContactInfoService,
    private renderer: Renderer2,
    public _project: ProjectService,
    public _projectEdit: ProjectEditService
  ) { }

  ngOnInit() {
    //this.getAllCompanies();
    this.userConnections = [];
    this.userId = JSON.parse(localStorage.getItem('currentUser'))['user_id'];
    this.profileId = JSON.parse(localStorage.getItem('currentUser'))['profile_id'];
    this.getUserDetails();
    this.companiesFollowed();
    this.showActivity();
    this.inputModal.toRefreshDetails$.subscribe(toRefresh => {
      if (toRefresh) this.getUserDetails();
    })
  }

  ngAfterViewInit() {
  }

  getUserDetails() {
    this.userConnections = [];
    this.authService.get_user_details(this.profileId)
      .subscribe(respObj => {
        this.userDetails = { ...respObj }
        this.setinitCover();
        this.getConnectionDetailList();
        // setTimeout(() => {
        //   this.isLoading = false;
        // }, 3000);
      })
  }
  projectLogoUpload(event, expId){
    if (event.target.files && event.target.files.length) {
      let selectedFiles = event.target.files;

      this.projectLogoFile = selectedFiles[0];
      console.log(this.projectLogoFile)
      this.authService.update_project_logo(expId, this.projectLogoFile)
        .subscribe(respObj => {
          this.notifService.showSuccess('Project logo changed successfully', 'Profile Alert')
          this.getUserDetails();
        });
    }
  }
  setinitCover() {
    if (!this.userDetails.cover_photo) {
      this.coverImgStyle = this.getSanitizedPhoto(`background-image: url("./assets/icons/1x/Asset 2.png")`);
    }
    else {
      this.coverImgStyle = this.getSanitizedPhoto(`background-image: url(${this.userDetails.cover_photo}`);
    }
  }

  getConnectionDetailList() {
    for (let user of this.userDetails['connections']) {
      this.authService.get_user_details(user)
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
    if (event.target.files && event.target.files.length) {
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
    this.authService.upload_user_video_resume(this.profileId, this.videoFile)
      .subscribe(_ => {
        this.notifService.showSuccess('Video uploaded successfully', 'profile Alert');
      })
  }

  onPhotoUpload(event) {
    console.log("hello")
    if (event.target.files && event.target.files.length) {
      let selectedFiles = event.target.files;
      this.imageFile = selectedFiles[0];

      this.authService.upload_user_photo(this.profileId, this.imageFile)
        .subscribe(respObj => {
          this.notifService.showSuccess('Photo changed successfully', 'Profile Alert');
          this.userDetails.photo = respObj['photo'];
        })

    }
    this.showCover = true;
  }
  onlyCover() {
    console.log("only cover")
    this.showCover = false;
  }

  onCoverUpload(event) {
    console.log("hi")
    if (event.target.files && event.target.files.length) {
      let selectedFiles = event.target.files;

      this.coverFile = selectedFiles[0];

      this.authService.upload_user_cover(this.profileId, this.coverFile)
        .subscribe(respObj => {

          const styleExp = `background-image: url(${respObj['cover_photo']})`;
          this.coverImgStyle = this.getSanitizedPhoto(styleExp);

          this.notifService.showSuccess('Cover changed successfully', 'Profile Alert')

        });
    }
  }

  onCompanyLogoUpload(event, expId) {
    if (event.target.files && event.target.files.length) {
      let selectedFiles = event.target.files;

      this.companyLogoFile = selectedFiles[0];
      this.authService.update_company_logo(expId, this.companyLogoFile)
        .subscribe(respObj => {
          this.notifService.showSuccess('Company logo changed successfully', 'Profile Alert')
          this.getUserDetails();
        });
    }
  }

  educationLogoUpload(event, expId) {
    if (event.target.files && event.target.files.length) {
      let selectedFiles = event.target.files;

      this.educationLogoFile = selectedFiles[0];
      this.authService.education_company_logo(expId, this.educationLogoFile)
        .subscribe(respObj => {
          this.notifService.showSuccess('Institute logo changed successfully', 'Profile Alert')
          this.getUserDetails();
        });
    }
  }

  getSanitizedPhoto(photoUrl: string) {
    return this.sanitizer.bypassSecurityTrustStyle(photoUrl);
  }

  openContactInfo(){
    this.contactInfo.openContactInfo(this.userDetails);
  }
  companiesFollowed(){
    this.netService.followed_companies(this.profileId).subscribe((data):any=>{
     console.log(data);
     this.companiesFollowedArray=data;
    })
  }
  showActivity(){
    this.netService.show_activity(this.userId).subscribe((data):any=>{
      console.log(data);
    //  this.companiesFollowedArray=data;
    this.activityArray=data;
     })
  }
  exportAsPDF(_data)
  {
    if(this.showPdf==false)
    this.showPdf=true;
    else
    this.showPdf
    console.log(_data)
   
    const doc = new jspdf();

    const specialElementHandlers = {
      '#editor': function (element, renderer) {
        return true;
      }
    };

    const pdfTable = this.Profile_pdf.nativeElement;

    doc.fromHTML(pdfTable.innerHTML, 15, 15, {
      width: 190,
      'elementHandlers': specialElementHandlers
    });

    doc.save('MyProfile.pdf');
    // var data = document.getElementById('MyDIv');  //Id of the table
    // html2canvas(data).then(canvas => {  
    //   // Few necessary setting options  
    //   let imgWidth = 208;   
    //   let pageHeight = 295;    
    //   let imgHeight = canvas.height * imgWidth / canvas.width;  
    //   let heightLeft = imgHeight;  
    //   console.log(canvas)
    //   const contentDataURL = canvas.toDataURL('image/png')  
    //   let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
    //   let position = 0;  
    //   pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)  
    //   pdf.save('MYPdf.pdf'); // Generated PDF   
    // });  
  }
  // public exportAsPDF(_data)
  // {
  // var data = document.getElementById('MyDIv');
  // html2canvas(data).then(canvas => {
  // var imgWidth = 208;
  // var pageHeight = 295;
  // var imgHeight = canvas.height * imgWidth / canvas.width;
  // var heightLeft = imgHeight;
   
  // const contentDataURL = canvas.toDataURL('image/png')
  // let pdf = new jspdf('p', 'mm', 'a4'); 
  // var position = 0;
  // pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
  // pdf.save('new-file.pdf');
  // });
  // }
}
