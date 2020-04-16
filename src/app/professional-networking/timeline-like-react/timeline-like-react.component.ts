import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { NetworkingService } from 'src/app/services/networking.service';
import { NotificationService } from 'src/app/services/notification.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { JobsService } from 'src/app/services/jobs.service';

@Component({
  selector: 'app-timeline-like-react',
  templateUrl: './timeline-like-react.component.html',
  styleUrls: ['./timeline-like-react.component.css']
})
export class TimelineLikeReactComponent implements OnInit {

  currentUser: any;
  postList: any[];
  statusText: string;
  commentTxt: string;
  timelineUpdateForm: FormGroup;

  @ViewChild('comment', { static: false }) commentRef: ElementRef
  constructor(
    private netService: NetworkingService,
    private notService: NotificationService,
    private cd: ChangeDetectorRef,
    private jobService:JobsService
  ) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'))['user_id'];
    console.log(this.currentUser);
    this.getUserPosts();
    this.timelineUpdateForm = new FormGroup({
      text: new FormControl(""),
      video: new FormControl(null),
      photo: new FormControl(null),
      slug: new FormControl('postStatus' + Math.floor(Math.random()*10))
    })
  }

  ngOnInit() {
  }

  getUserPosts() {
    this.netService.get_posts()
      .subscribe(respObj => {
        this.postList = [...respObj['results']];
        this.getPostsReactions();
      })
  }

  createStatus() {
    let data = {
      author_user: this.currentUser,
      text: this.statusText,
      slug: 'hell' + Math.floor(Math.random())
    }
    this.netService.create_post(data).subscribe(respObj => {
      console.log(respObj),
      this.notService.showSuccess("Posted Successfully","success")
      this.getUserPosts()
    })
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
  ReactPost(postId) {
    this.netService.like_post(postId)
      .subscribe(respObj => {
        let post = this.postList.find(post => post.id == postId);
        post['isReacted'] = true;
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
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.timelineUpdateForm.patchValue({
          video: reader.result
        });

        this.cd.markForCheck();
      };
    }
  }
  onPhotoUpload(event) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.timelineUpdateForm.patchValue({
          photo: reader.result
        });

        this.cd.markForCheck();
      };
    }
  }
  onSubmit() {
    if (!this.timelineUpdateForm.valid) return;
    this.timelineUpdateForm.patchValue({text:this.statusText});
       console.log(this.timelineUpdateForm.value)
    this.jobService.update_status(this.timelineUpdateForm.value)
      .subscribe(respObj => {
        console.log(respObj);
      })
  }

}
