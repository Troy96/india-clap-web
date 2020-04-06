import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from '../config';

@Injectable({
  providedIn: 'root'
})
export class NetworkingService {

  constructor(private http: HttpClient) { }

  get_companies() {
    return this.http.get(`${config.base_url}/JobMarket/companies`);
  }

  create_company($data) {
    return this.http.post(`${config.base_url}/JobMarket/companies/create`, $data);
  }

  get_company_details(id: number) {
    return this.http.get(`${config.base_url}/JobMarket/companies/${id}`)
  }

  get_posts() {
    return this.http.get(`${config.base_url}/Networking/timelinePosts`);
  }

  create_post($data){
    return this.http.post(`${config.base_url}/Networking/timelinePosts/`, $data);
  }
}
