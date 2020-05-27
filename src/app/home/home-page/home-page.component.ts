import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(
    private _title: Title
  ) { }

  ngOnInit() {
    this._title.setTitle('Holagraph: Log In or Sign Up');
  }

}
