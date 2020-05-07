import { Component, OnInit } from '@angular/core';
import { AuthServices } from 'src/app/services/auth.service';

@Component({
  selector: 'app-mynetwork',
  templateUrl: './mynetwork.component.html',
  styleUrls: ['./mynetwork.component.css']
})
export class MynetworkComponent implements OnInit {

  userId: number;
  connectionIdList: number[];
  connectionDetailList: any[] = [];
  term: string;

  constructor(
    private userService: AuthServices
  ) {
    console.log('fgghtntnnt');
    this.userId = JSON.parse(localStorage.getItem('currentUser'))['user_id'];
  }

  ngOnInit() {
    this.getUserDetails();
  }

  getUserDetails() {
    this.userService.get_user_details(this.userId)
      .subscribe(respObj => {
        this.connectionIdList = [...respObj['connections']];
        this.getConnectionDetails();
      })
  }

  private async getConnectionDetails() {
    this.connectionIdList.forEach(async id => {
      const detail = await this.userService.get_user_details(id).toPromise();
      this.connectionDetailList.push(detail);
    })
  }

}
