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
    return this.http.get<any>(`${config.base_url}/Networking/timelinePosts`);
  }

  create_post($data, userId) {
    const formData = new FormData();
    formData.append('text', $data.text);
    formData.append('photo',$data.photo);
    formData.append('video',$data.video);
    formData.append('author_user', userId);
    // formData.append('slug',$data.slug);
    return this.http.post(`${config.base_url}/Networking/timelinePosts/`, formData);  }

  like_post(postId: number) {
    return this.http.get(`${config.base_url}/Networking/timelinePosts/${postId}/like`)
  }

  get_reactions_count(postId: number) {
    return this.http.get(`${config.base_url}/Networking/timelinePostReactions/${postId}/`);
  }

  comment_on_post(postId: number, comment: string) {
    const formData = new FormData();
    formData.append('comment', comment);
    return this.http.post(`${config.base_url}/Networking/timelinePosts/${postId}/comment`, formData);
  }

  follow_request(userId: number) {
    return this.http.get(`${config.base_url}/Networking/connection-request/send/${userId}/`)
  }

  cancel_request(userId: number) {
    return this.http.get(`${config.base_url}/Networking/connection-request/cancel/${userId}`);
  }

  accept_request(userId: number) {
    return this.http.get(`${config.base_url}/Networking/connection-request/accept/${userId}`);
  }

  delete_request(userId: number) {
    return this.http.get(`${config.base_url}/Networking/connection-request/delete/${userId}`);
  }

  get_contacts() {
    return this.http.get<any>(`${config.base_url}/Networking/contacts/`)
  }
  change_password($data) {
    return this.http.put(`${config.base_url}/accounts/change-password/`, $data);
  }

  remove_user_connection(userId) {
    return this.http.get<any>(`${config.base_url}/Networking/connection/remove/${userId}/`);
  }
  report_post(postId,$data)
  {
     const formData = new FormData();
    formData.append('flaggedReason', $data.flaggedReason);
    return this.http.post(`${config.base_url}/Networking/timelinePost/${postId}/report/`, formData);

  }
  post_reaction(postId,$data)
  {  
    const formData = new FormData();
      formData.append('emoji', $data.emoji);

    return this.http.post(`${config.base_url}/Networking/timelinePosts/${postId}/emoji`, formData);

  }
  
}
