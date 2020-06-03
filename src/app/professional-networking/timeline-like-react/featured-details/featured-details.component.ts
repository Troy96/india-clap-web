import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-featured-details',
  templateUrl: './featured-details.component.html',
  styleUrls: ['./featured-details.component.css']
})
export class FeaturedDetailsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log("in feature component")
  }

  // showToasterSuccess(str: any) {
  //   this.notifyService.showSuccess("Successful", str)
  // }
  // showToasterError(str: any) {
  //   this.notifyService.showError("Something is wrong", str)
  // }
}
