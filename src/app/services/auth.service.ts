import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { config } from '../config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {



  private currentUserSubject: BehaviorSubject<any>;
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });


  constructor(
    private http: HttpClient
  ) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  register($data) {
    return this.http.post(`${config.base_url}/accounts/register/`, $data, { headers: this.headers });
  }

  login($data) {
    return this.http.post(`${config.base_url}/accounts/login/`, $data, { headers: this.headers });
  }

  get_user_profiles() {
    return this.http.get(`${config.base_url}/Users/profiles/`);
  }

  get_user_details(id: number) {
    return this.http.get(`${config.base_url}/Users/profiles/${id}`);
  }

  get_privacy_details() {
    return this.http.get(`${config.base_url}/Users/privacy`);
  }
  forgot_password($data) {
    return this.http.post(`${config.base_url}/accounts/password-reset/reset_password/`, $data, { headers: this.headers });
  }
  reset_password($data) {
    return this.http.post(`${config.base_url}/accounts/password-reset/confirm/`, $data, { headers: this.headers });
  }
  edit_privacy_details($data) {
    return this.http.post(`${config.base_url}/Users/privacy/setting/save`, $data, { headers: this.headers });
  }

  get_user_notifications() {
    return this.http.get(`${config.base_url}/Notifications/notifications`);
  }

  logout() {
    return localStorage.removeItem('currentUser');
  }
}
