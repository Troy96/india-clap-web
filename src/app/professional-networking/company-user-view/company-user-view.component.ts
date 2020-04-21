import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NetworkingService } from 'src/app/services/networking.service';

@Component({
  selector: 'app-company-user-view',
  templateUrl: './company-user-view.component.html',
  styleUrls: ['./company-user-view.component.css']
})
export class CompanyUserViewComponent implements OnInit {

  companyId: number;
  companyDetails: any = {};
  companyPosts: any[];
  commentTxt: string;
  connectionStatus: string;
  isFollowed:Boolean = false;
  constructor(
    private router: ActivatedRoute,
    private netService: NetworkingService
  ) {
    this.companyId = +this.router.snapshot.paramMap.get('id');
    this.getCompanyDetails();
  }

  ngOnInit() {
    
  }

  getCompanyDetails() {
    this.netService.get_company_details(this.companyId)
      .subscribe(respObj => {
        this.companyDetails = { ...respObj };
        this.companyPosts = [...respObj['company_posts']];
        let findFollower = (this.companyDetails.followers_of_company);
        let _profileId = (JSON.parse(localStorage.getItem('currentUser'))).profile_id;
        // console.log(_profileId)
        for(let i=0;i<findFollower.length;i++)
        {
          if(findFollower[i]==_profileId)
          {
            this.isFollowed = true;
          }
        }
      })

  }

  likePost(postId) {
    this.netService.like_post(postId)
      .subscribe(respObj => {
        let post = this.companyPosts.find(post => post.id == postId);
        post['isLiked'] = true;
      })
  }

  postComment(postId: number) {
    this.netService.comment_on_post(postId, this.commentTxt)
      .subscribe(respObj => {
        console.log(respObj);
      })
  }

  onFollowRequest() {
    this.netService.follow_request(this.companyId)
      .subscribe(respObj => {
        console.log(respObj)
      });
  }

  onRejectRequest() {
    this.netService.cancel_request(this.companyId)
      .subscribe(respObj => {
        console.log(respObj);
      })
  }

  onAcceptRequest() {
    this.netService.accept_request(this.companyId)
      .subscribe(respObj => {
        console.log(respObj);
      })
  }

  onDeleteRequest() {
    this.netService.delete_request(this.companyId)
      .subscribe(respObj => {
        console.log(respObj)
      })
  }
  onFollowCompany(){
    this.netService.companyFollow_request(this.companyId)
      .subscribe(respObj => {
        console.log(respObj)
      })
  }


  // isUserConnection() {
  //   const user = this.userList.find(user => user['id'] === this.companyId);
  //   if (user) return true;
  //   return false;
  // }

  // getConnectionStatus() {
  //   this.contactList.forEach(user => {
  //     if ((user['user_from']['id'] === this.currentUser['user_id']) && (user['user_to']['id'] === this.companyId)) {
  //       return this.connectionStatus = 'pending';
  //     }
  //     else if ((user['user_from']['id'] === this.companyId) && (user['user_to']['id'] === this.currentUser['user_id'])) {
  //       return this.connectionStatus = 'approval needed';
  //     }
  //   })
  //   if (!!this.isUserConnection()) {
  //     this.connectionStatus = 'connected';
  //   }
  //   else if ((!this.isUserConnection()) && ((this.connectionStatus != 'pending') || (this.connectionStatus != 'approval needed'))) {
  //     this.connectionStatus = 'none';
  //   }
  // }

  get currentUser() {
    return JSON.parse(localStorage.getItem('currentUser'));
  }

}
