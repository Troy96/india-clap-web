import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { NetworkingService } from 'src/app/services/networking.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { JobsService } from 'src/app/services/jobs.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-timeline-like-react',
  templateUrl: './timeline-like-react.component.html',
  styleUrls: ['./timeline-like-react.component.css']
})
export class TimelineLikeReactComponent implements OnInit {

  currentUser: any;
  postList: any[];
  statusText: string="";
  commentTxt: string;
  timelineUpdateForm: FormGroup;
  photoVal:boolean = true;
  videoval:boolean= true;
  @ViewChild('comment', { static: false }) commentRef: ElementRef
  constructor(
    private netService: NetworkingService,private cd: ChangeDetectorRef,private jobService:JobsService
,private notifyService : NotificationService
  ) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'))['user_id'];
    console.log(this.currentUser);
    this.getUserPosts();
    this.timelineUpdateForm = new FormGroup({
      text: new FormControl(""),
      video: new FormControl(""),
      photo: new FormControl(""),
      // slug: new FormControl('postStatus' + Math.floor(Math.random() * 230) + 90)
    })
  }

  ngOnInit() {
  }

  getUserPosts() {
    this.netService.get_posts()
      .subscribe(respObj => {
        this.postList = [...respObj];
        this.getPostsReactions();
      })
  }

  createStatus() {
    
    this.timelineUpdateForm.patchValue({text:this.statusText});
       console.log(this.timelineUpdateForm.value)
       if (!this.timelineUpdateForm.valid || (this.timelineUpdateForm.get('text').value==""&&this.timelineUpdateForm.get('photo').value==""&&this.timelineUpdateForm.get('video').value==""))
    {
      this.showToasterError("Please add a text,photo or video first!");
      return;
    } 
       this.netService.create_post(this.timelineUpdateForm.value, this.currentUser)
      .subscribe(respObj => {
        console.log(respObj);
        this.statusText="";
        this.showToasterSuccess("Your Status has been updated")
       // this.ngOnInit();
      //  location.reload();
        this.timelineUpdateForm.patchValue({
          text:"",
          photo:"",
          video:""
        })
        this.statusText=""
      },
      err=>{
        this.showToasterError("Please Select another image or video")
        this.timelineUpdateForm.patchValue({
          text:"",
          photo:"",
          video:""
        })
      }
      )
  }

  async getPostsReactions() {
    for await (let post of this.postList) {
      this.netService.get_reactions_count(post.id)
        .subscribe(respObj => {
          post['isLiked'] = respObj['like']
        })
    }
  }

  likePost(postId) {
    this.netService.like_post(postId)
      .subscribe(respObj => {
        let post = this.postList.find(post => post.id == postId);
        post['isLiked'] = true;
      })
  }

  postComment(postId: number) {
    this.netService.comment_on_post(postId, this.commentTxt)
      .subscribe(respObj => {
        console.log(respObj);
      })
  }

  commentOnPost(postId: number) {
    this.netService.comment_on_post(postId, this.commentTxt)
      .subscribe(respObj => {
        console.log(respObj);
      })
  }
  onVideoUpload(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
     
      let selectedFiles = event.target.files;
      // console.log(event.target.result);
      let _file = selectedFiles[0];
      console.log(_file)
      this.timelineUpdateForm.patchValue({
        video:_file
      })
     
    }
  }
  onPhotoUpload(event) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
     
      let selectedFiles = event.target.files;
      // console.log(event.target.result);
      let _file = selectedFiles[0];
      this.timelineUpdateForm.patchValue({
        photo:_file
      })
    }
    
  }
 
  showToasterSuccess(str:any){
    this.notifyService.showSuccess("Successful", str)
  }
  showToasterError(str:any){
    this.notifyService.showError("Something is wrong", str)
}

report(id:number){
  let obj:any={};
  obj.flaggedReason = "";
  this.netService.report_post(id,obj).subscribe((data:any)=>{
    console.log(data);
    this.showToasterSuccess("You have reported the Post!")

  },
  err=>{
    this.showToasterError("Something went wrong")
  })
}


}
