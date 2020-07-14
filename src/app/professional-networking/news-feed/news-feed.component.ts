import { Component, OnInit } from '@angular/core';
import { config } from '../../config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { NetworkingService } from 'src/app/services/networking.service';

@Component({
  selector: 'app-news-feed',
  templateUrl: './news-feed.component.html',
  styleUrls: ['./news-feed.component.css']
})
export class NewsFeedComponent implements OnInit {
  moment;
  newsUrl: string = `http://newsapi.org/v2/top-headlines?country=in&category=health&apiKey=${config.news_api_key}`;
  newsList: any[];
  loading = true;

  constructor(private _netService: NetworkingService) { }

  ngOnInit() {
    this.moment = moment;
    this.fetchNews()
  }

  async fetchNews() {
    this.loading = true;
    const resp: any = await this._netService.get_news_feed().toPromise();
    this.newsList = resp.data.feed.entry;
    this.loading = false;
  }

}
