import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-professional-networking',
  templateUrl: './professional-networking.component.html',
  styleUrls: ['./professional-networking.component.css']
})
export class ProfessionalNetworkingComponent implements OnInit {

  constructor(
    private title: Title,
  ) { }

  ngOnInit() {
    this.title.setTitle('Professional Networking | India Clap');
  }

}
