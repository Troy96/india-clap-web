import { Component, OnInit } from '@angular/core';
import { NetworkingService } from 'src/app/services/networking.service';

@Component({
  selector: 'app-timeline-like-react',
  templateUrl: './timeline-like-react.component.html',
  styleUrls: ['./timeline-like-react.component.css']
})
export class TimelineLikeReactComponent implements OnInit {

  currentUser: any;
  postList: any[];

  constructor(
    private netService: NetworkingService
  ) {
    this.currentUser = localStorage.getItem('currentUser')['user_id'];
    this.getUserPosts();
  }

  ngOnInit() {
  }

  getUserPosts() {
    this.netService.get_posts()
      .subscribe(respObj => {
        console.log(respObj)
        this.postList = [...respObj['results']];
      })
  }

}
