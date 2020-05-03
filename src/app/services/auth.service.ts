import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { config } from '../config';

@Injectable({
  providedIn: 'root'
})
export class AuthServices {



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
    return this.http.get<any>(`${config.base_url}/Users/users`);
  }

  search_user(searchKey) {
    return this.http.get<any>(`${config.base_url}/Users/users?search=` + searchKey);
  }

  get_user_details(id: number) {
    return this.http.get<any>(`${config.base_url}/Users/profiles/${id}`);
  }

  update_user_details(userId, data) {
    return this.http.patch(`${config.base_url}/Users/profiles/${userId}/`, data)
  }

  upload_user_video_resume(userId, data) {
    const formData = new FormData();
    formData.append('video_resume', data);
    return this.http.patch(`${config.base_url}/Users/profiles/${userId}/`, formData)
  }

  upload_user_photo(userId, data) {
    const formData = new FormData();
    formData.append('photo', data);
    return this.http.patch(`${config.base_url}/Users/profiles/${userId}/`, formData)
  }

  upload_user_cover(userId, data) {
    const formData = new FormData();
    formData.append('cover_photo', data);
    return this.http.patch(`${config.base_url}/Users/profiles/${userId}/`, formData);
  }

  add_certificate($data) {
    return this.http.post(`${config.base_url}/Users/certifications/`, $data)
  }

  add_skill($data) {
    return this.http.post(`${config.base_url}/Users/skills/`, $data);
  }

  add_experience($data) {
    return this.http.post(`${config.base_url}/Users/experiences/`, $data);
  }

  update_experience(id, $data) {
    return this.http.patch(`${config.base_url}/Users/experiences/${id}/`, $data)
  }

  update_company_logo(id, logo) {
    const formData = new FormData();
    formData.append('company_logo', logo);
    return this.http.patch(`${config.base_url}/Users/experiences/${id}/`, formData)
  }

  delete_experience(id) {
    return this.http.delete(`${config.base_url}/Users/experiences/${id}/`)
  }

  add_project($data) {
    return this.http.post(`${config.base_url}/Users/projects/`, $data)
  }

  update_project(id, $data) {
    return this.http.patch(`${config.base_url}/Users/projects/${id}/`, $data);
  }

  update_skill(id, $data) {
    return this.http.patch(`${config.base_url}/Users/skills/${id}/`, $data);
  }

  delete_project(id) {
    return this.http.delete(`${config.base_url}/Users/projects/${id}/`);
  }

  get_certificate(id: number) {
    return this.http.get<any>(`${config.base_url}/Users/certifications/${id}`);
  }



  update_certificate(id: number, $data) {
    return this.http.patch<any>(`${config.base_url}/Users/certifications/${id}/`, $data);
  }

  delete_certificate(id: number) {
    return this.http.delete<any>(`${config.base_url}/Users/certifications/${id}/`);
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
    return this.http.get<any>(`${config.base_url}/Notifications/notifications`);
  }

  logout() {
    return localStorage.removeItem('currentUser');
  }
  fb_login($data) {
    return this.http.post(`${config.base_url}/accounts/fblogin/`, $data, { headers: this.headers });

  }
  add_education( $data){
    return this.http.post(`${config.base_url}/Users/education/`, $data);

  }
  update_education(id, $data){
    return this.http.patch(`${config.base_url}/Users/education/${id}/`, $data);

  }
  education_company_logo(id,logo){
    const formData = new FormData();
    formData.append('institute_logo', logo);
    return this.http.patch(`${config.base_url}/Users/education/${id}/`, formData);
  }
  add_language($data){
    return this.http.post(`${config.base_url}/Users/languages/`, $data);

  }
  update_language(id,$data){
    return this.http.patch(`${config.base_url}/Users/languages/${id}/`, $data);
  }
  add_award($data){
    return this.http.post(`${config.base_url}/Users/awards/`, $data);

  }
  update_award(id,$data){
    return this.http.patch(`${config.base_url}/Users/awards/${id}/`, $data);

  }
  add_hobby($data){
    return this.http.post(`${config.base_url}/Users/hobbies/`, $data);

  }
  update_hobby(id,$data){
    return this.http.patch(`${config.base_url}/Users/hobbies/${id}/`, $data);

  }
}
