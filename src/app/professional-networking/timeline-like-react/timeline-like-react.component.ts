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
  showEmoji: Boolean = false;
  currentUser: any;
  postList: any[];
  statusText: string = "";
  timelineUpdateForm: FormGroup;
  photoVal:boolean = true;
  videoval:boolean= true;
  isReacted:boolean=true;
  isReported:boolean=true;
  @ViewChild('comment', { static: false }) commentRef: ElementRef
  constructor(
    private netService: NetworkingService, private cd: ChangeDetectorRef, private jobService: JobsService
    , private notifyService: NotificationService
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
  IsReacted(){
    this.isReacted =!this.isReacted;
  }
  IsReported(){
    this.isReported =!this.isReported;
  }

  createStatus() {

    this.timelineUpdateForm.patchValue({ text: this.statusText });
    console.log(this.timelineUpdateForm.value)
    if (!this.timelineUpdateForm.valid || (this.timelineUpdateForm.get('text').value == "" && this.timelineUpdateForm.get('photo').value == "" && this.timelineUpdateForm.get('video').value == "")) {
      this.showToasterError("Please add a text,photo or video first!");
      return;
    }
    this.netService.create_post(this.timelineUpdateForm.value, this.currentUser)
      .subscribe(respObj => {
        console.log(respObj);
        this.statusText = "";
        this.showToasterSuccess("Your Status has been updated")
        // this.ngOnInit();
        //  location.reload();
        this.timelineUpdateForm.patchValue({
          text: "",
          photo: "",
          video: ""
        })
        this.statusText = ""
      },
        err => {
          this.showToasterError("Please Select another image or video")
          this.timelineUpdateForm.patchValue({
            text: "",
            photo: "",
            video: ""
          })
        }
      )
  }

  async getPostsReactions() {
    for await (let post of this.postList) {
      this.netService.post_user_like_status(post.id)
        .subscribe(respObj => {
          if (respObj.detail === 'Not Liked by user') {
            post['isLiked'] = false
          }
          else {
            post['isLiked'] = true
          }
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

  postComment(postId: number, commentTxt) {
    this.netService.comment_on_post(postId, commentTxt)
      .subscribe(respObj => {
        console.log(respObj);
      })
  }

  // commentOnPost(postId: number) {
  //   this.netService.comment_on_post(postId, this.commentTxt)
  //     .subscribe(respObj => {
  //       console.log(respObj);
  //     })
  // }
  getPostComments(postId) {
    const post = this.postList.find(post => post.id === postId);
    this.netService.get_post_comments(postId)
      .subscribe(respObj => {
        post['comments'] = [...respObj]
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
        video: _file
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
        photo: _file
      })
    }

  }

  showToasterSuccess(str: any) {
    this.notifyService.showSuccess("Successful", str)
  }
  showToasterError(str: any) {
    this.notifyService.showError("Something is wrong", str)
  }

  report(id: number) {
    let obj: any = {};
    obj.flaggedReason = "";
    this.netService.report_post(id, obj).subscribe((data: any) => {
      console.log(data);
      this.showToasterSuccess("You have reported the Post!")

    },
      err => {
        this.showToasterError("Something went wrong")
      })
  }
  smiley() {
    if (this.showEmoji == true)
      this.showEmoji = false;
    else
      this.showEmoji = true;
    // var menu = document.querySelector('like-options') // Using a class instead, see note below.
    // menu.classList.toggle('hidden-phone');

  }
  reactType(id: any, _id: any) {
    console.log(id)
    if (this.showEmoji == true)
      this.showEmoji = false;
    else
      this.showEmoji = true;
    let obj: any = {};
    obj.emoji = id;
    this.netService.post_reaction(_id, obj).subscribe((data) => {
      console.log(data);
      this.showToasterSuccess("Thanks for reacting")
    }, err => {
      this.showToasterError("Something went wrong")
    }
    )
  }
}
