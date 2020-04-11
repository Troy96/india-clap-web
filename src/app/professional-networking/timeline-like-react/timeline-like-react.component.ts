import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NetworkingService } from 'src/app/services/networking.service';

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

  @ViewChild('comment', { static: false }) commentRef: ElementRef
  constructor(
    private netService: NetworkingService
  ) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'))['user_id'];
    this.getUserPosts();
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
      slug: 'post' + Math.floor(Math.random())
    }
    this.netService.create_post(data).subscribe(respObj => {
      console.log(respObj)
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


}
