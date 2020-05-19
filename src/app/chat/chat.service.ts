import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { HttpClient } from '@angular/common/http';
import { config } from '../config';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  socket: WebSocketSubject<any>;
  token: string;

  private newMessage = new BehaviorSubject<any>('');
  public newMessage$ = this.newMessage.asObservable();

  constructor(
    private _http: HttpClient
  ) {
    this.token = JSON.parse(localStorage.getItem('currentUser'))['token'];
  }

  sendMessage(data) {
    this.socket.next({ message: data });
  }

  async connect(userId: number) { //Take the userId of the other user as argument here
    this.socket = webSocket('wss://holagraph-indiaclap.herokuapp.com/messages/' + userId + '/?token=' + this.token); //Replace 5 with the userId
    this.socket.asObservable().subscribe(newMessage => {
      this.newMessage.next(newMessage);
    })
  }

  getMessages(userId: number) {
    return this._http.get<any[]>(`${config.base_url}/messages/${userId}/`);
  }
  usersList() {
    return this._http.get(`${config.base_url}/messages/connections/`);
  }
}
