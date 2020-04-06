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
  statusText: string;

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

}
