import { Component, OnInit } from '@angular/core';
import { config } from '../../config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-news-feed',
  templateUrl: './news-feed.component.html',
  styleUrls: ['./news-feed.component.css']
})
export class NewsFeedComponent implements OnInit {
  moment;
  newsUrl: string = `http://newsapi.org/v2/top-headlines?country=in&category=health&apiKey=${config.news_api_key}`;
  newsList: any[];

  constructor(private _http: HttpClient) { }

  ngOnInit() {
    this.moment = moment;
    this.fetchNews()
  }

  async fetchNews() {
    const resp = await this._http.get<any>(this.newsUrl).toPromise();
    this.newsList = resp.articles;
  }

}
