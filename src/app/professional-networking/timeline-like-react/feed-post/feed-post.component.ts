import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { NetworkingService } from 'src/app/services/networking.service';
import { FormGroup } from '@angular/forms';
import { JobsService } from 'src/app/services/jobs.service';
import { NotificationService } from 'src/app/services/notification.service';
import { CommunicateService } from 'src/app/services/communicate.service';
import { AuthServices } from 'src/app/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';


@Component({
  selector: 'app-feed-post',
  templateUrl: './feed-post.component.html',
  styleUrls: ['./feed-post.component.css']
})
export class FeedPostComponent implements OnInit {

  showModal: boolean = false;
  showEmoji: Boolean = false;
  currentUser: any;
  currentUserDetails: any;
  postList: any[];
  commentList: any = [];
  statusText: string = "";
  timelineUpdateForm: FormGroup;
  photoVal: boolean = true;
  videoval: boolean = true;
  users: any[];
  showReact: number = 0;
  allReactions: any = [];
  numLiked: number = 0;
  numLoved: number = 0;
  numClapped: number = 0;
  numIdea: number = 0;
  numThink: number = 0;
  numAll: number = 0;
  moment: any;

  postId: number;
  post: any;

  @ViewChild('comment', { static: false }) commentRef: ElementRef

  constructor(

    private netService: NetworkingService, private cd: ChangeDetectorRef, private jobService: JobsService
    , private notifyService: NotificationService,
    private commService: CommunicateService,
    private authService: AuthServices,
    private router: Router,
    private route: ActivatedRoute
  ) { 
    this.moment = moment;
  }

  ngOnInit() {
    this.postId = Number(this.route.snapshot.paramMap.get('postId'));
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'))['user_id'];
    this.getPostDetail();
  }

  getPostDetail() {
    this.netService.get_post_by_id(this.postId)
      .subscribe(
        data => {
          this.post = { ...data };
        }
      )
  }

  likePost(postId) {
    this.netService.like_post(postId)
      .subscribe((respObj: any) => {
        console.log(respObj);
        let post = this.postList.find(post => post.id == postId);
        if (respObj.detail == 'Unliked Post')
          post['isLiked'] = false;
        else
          post['isLiked'] = true;
      })
  }

  postComment(postId: number, commentTxt) {
    this.netService.comment_on_post(postId, commentTxt)
      .subscribe(respObj => {
        console.log(respObj);
        this.getPostComments(postId);
      })
  }

  replyComment(postId: number, commentId: number, replytxt: string) {
    this.netService.reply_on_comment(postId, commentId, replytxt)
      .subscribe(respObj => {
        console.log(respObj)
        this.getPostComments(postId);
      })
  }

  // commentOnPost(postId: number) {
  //   this.netService.comment_on_post(postId, this.commentTxt)
  //     .subscribe(respObj => {
  //       console.log(respObj);
  //     })
  // }
  getPostComments(postId) {
    // this.netService.get_all_reactions(postId).subscribe((data):any=>{
    //   console.log(data);
    // })
    const post = this.postList.find(post => post.id === postId);
    this.netService.get_post_comments(postId)
      .subscribe(respObj => {
        // this.netService.find_comment_liked().subscribe((data):any=>{
        //   console.log(data);
        // })
        //this.commentList['comments'] = [...respObj];
        // post['comments'] = [...respObj]
        // post['comments'].map(commemt => {
        //   const user = this.users.find(user => user.id === commemt.user);
        //   commemt['profile'] = user.photo;
        //   commemt['first_name'] = user.first_name;
        //   commemt['last_name'] = user.last_name;
        // })

        // console.log(respObj)
        // this.commentList =
        //   (respObj);

        // console.log(this.commentList)
        //  this.getCommentsReactions()
        // post['comments'] = [...respObj]
        // for (let comment of post.comments) {
        //   this.netService.comment_user_like_status(comment.id, comment.post)
        //     .subscribe(respObj => {
        //       console.log(respObj);
        //       if (respObj.detail === "False") {
        //         comment.isLiked = false
        //       }
        //       else {
        //         comment.isLiked = true
        //       }
        //     })
        // }
        console.log(respObj)
        respObj.sort((a, b) => {
          if (a.id > b.id) return -1;
        })

        post['comments'] = respObj;

        post['comments'].forEach(async comment => {
          const resp = await this.netService.comment_user_like_status(comment['id'], comment['post']).toPromise();
          const user = this.users.find(user => user.id === comment.user);
          let isLiked: boolean = false;
          if (resp.detail == 'True') isLiked = true;

          comment['profile'] = user.photo;
          comment['first_name'] = user.first_name;
          comment['last_name'] = user.last_name;
          comment['isLiked'] = isLiked;
        })
        console.log(post)
        // (async function next(i){
        //   console.log(respObj[i])
        //   if(i == respObj.length) return;
        //   that.netService.comment_user_like_status(respObj[i].id, respObj[i].post)
        //   .subscribe(resp => {
        //     const user = that.users.find(user => user.id === respObj[i].user);
        //     if (!respObj[i].reply) {
        //       let isLiked: boolean = false;
        //       if (resp.detail === 'True') isLiked = true
        //       post['comments'][respObj[i].id] = {
        //         ...respObj[i],
        //         profile: user.photo,
        //         first_name: user.first_name,
        //         last_name: user.last_name,
        //         isLiked
        //       }
        //     }
        //     else {
        //       let isLiked: boolean = false;
        //       if (resp.detail === 'True') isLiked = true
        //       const commentObj = post['comments'][respObj[i].reply];
        //       if(!!commentObj){
        //         commentObj['reply'] = {
        //           ...respObj[i],
        //           profile: user.photo,
        //           first_name: user.first_name,
        //           last_name: user.last_name,
        //           isLiked
        //         }
        //       }
        //     }
        //   })
        //   setTimeout(async () => {
        //     return await next(++i)
        //   }, 2000);
        // }(0))
        console.log(this.postList)
      })
  }

  report(id: number) {
    let obj: any = {};
    obj.flaggedReason = "";
    this.netService.report_post(id, obj).subscribe((data: any) => {
      //  console.log(data);
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
    // console.log(id)
    if (this.showEmoji == true)
      this.showEmoji = false;
    else
      this.showEmoji = true;
    let obj: any = {};
    obj.emoji = id;
    this.netService.post_reaction(_id, obj).subscribe((data) => {
      console.log(data);
      this.getPostsReactions()
      //  this.showToasterSuccess("Thanks for reacting")
    }, err => {
      this.showToasterError("Something went wrong")
    }
    )
  }

  async getPostsReactions() {
    for await (let post of this.postList) {
      this.netService.post_user_like_status(post.id)
        .subscribe(respObj => {
          if (respObj.detail === 'False') {
            post['isLiked'] = false
          }
          else {
            post['isLiked'] = true
          }
        })
      this.netService.post_user_react_status(post.id)
        .subscribe(respObj => {
          //  console.log(respObj)
          if (respObj.detail === '1' || respObj.detail === '2' || respObj.detail === '3' || respObj.detail === '4') {
            post['isReacted'] = true
          }
          else {
            post['isReacted'] = false
          }
        })
    }
  }
  enter(ev, id) {
    this.showEmoji = true;
    this.showReact = id;
  }
  leave(ev, id) {
    this.showEmoji = false;
    this.showReact = id;
  }
  likeComment(commentId, postId) {
    // console.log(commentId, postId);
    this.netService.like_comment(commentId, postId).subscribe((data): any => {
      console.log(data);
      this.getPostComments(postId);
    })
  }
  reactionPostId: number = 0;
  showAllReactions(ev, postId) {
    this.reactionPostId = postId;
    // $("#resetModal").modal("show");
    this.netService.get_all_reactions(postId).subscribe((data): any => {
      console.log(data);
      this.allReactions = data;
    })
    this.showModal = true;
  }
  closeAllReactions(ev) {
    // $("#resetModal").modal("hide");
    this.showModal = false;
    this.allReactions = [];
    this.reactionPostId = 0;

  }

  showToasterSuccess(str: any) {
    this.notifyService.showSuccess("Successful", str)
  }
  showToasterError(str: any) {
    this.notifyService.showError("Something is wrong", str)
  }
  all_reactions() {
    // console.log("all");
    //  this.reactionPostId=id;
    this.loveReactions();
    this.clapReactions();
    this.ideaReactions();
    this.thinkReactions();
    this.likeReactions();
    //  this.numAll = this.numClapped+this.numIdea+this.numLoved+this.numThink+this.numLiked;
    // console.log(this.numAll)
    this.netService.get_all_reactions(this.reactionPostId).subscribe((data): any => {
      console.log(data);
      this.allReactions = data;
      this.numAll = data.length;
    })
  }
  loveReactions() {
    //  console.log("love");
    this.netService.get_all_emojiReactions(2, this.reactionPostId).subscribe((data): any => {
      //  console.log(data);
      this.numLoved = data.length;
      this.allReactions = data;
    })
  }
  clapReactions() {
    //  console.log("clap");
    this.netService.get_all_emojiReactions(1, this.reactionPostId).subscribe((data): any => {
      //  console.log(data);
      this.numClapped = data.length;
      this.allReactions = data;
    })
  }
  ideaReactions() {
    //  console.log("idea");
    this.netService.get_all_emojiReactions(3, this.reactionPostId).subscribe((data): any => {
      //   console.log(data);
      this.numIdea = data.length;
      this.allReactions = data;
    })
  }
  thinkReactions() {
    //  console.log("think");
    this.netService.get_all_emojiReactions(4, this.reactionPostId).subscribe((data): any => {
      //    console.log(data);
      this.numThink = data.length;
      this.allReactions = data;
    })
  }
  likeReactions() {
    //  console.log("like");
    this.netService.get_all_likeReactions(this.reactionPostId).subscribe((data): any => {
      //    console.log(data);
      this.numLiked = data.length;
      this.allReactions = data;
    })
  }
  // showReactorProfile(profileId){
  //   this.router.navigate
  // }
  likeReply(replyId, postId) {
    this.netService.like_comment(replyId, postId).subscribe((data): any => {
      console.log(data);
      this.getPostComments(postId);
    })
  }

}
