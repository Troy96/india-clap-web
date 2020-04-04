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

 
  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  register($data)
  {
    return this.http.post(`${config.base_url}/accounts/register/`, $data, { headers: this.headers });
  }

  login($data)
  {
    return this.http.post(`${config.base_url}/accounts/login/`, $data, { headers: this.headers });
  }
  forgot_password($data) {
    return this.http.post(`${config.base_url}/accounts/password_reset/reset_password`, $data, { headers: this.headers });
  }
  reset_password($data)
  {
    return this.http.post(`${config.base_url}/accounts/password_reset/confirm/`, $data, { headers: this.headers });

  }
}
