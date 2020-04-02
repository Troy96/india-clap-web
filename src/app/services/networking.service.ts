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
}
