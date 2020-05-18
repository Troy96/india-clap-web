import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { HttpClient } from '@angular/common/http';
import { config } from '../config';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  socket: WebSocketSubject<any>;
  token: string;

  constructor(
    private _http: HttpClient
  ) { 
    this.token = JSON.parse(localStorage.getItem('currentUser'))['token'];
  }

  sendMessage(data) {
    this.socket.next({ message: data });
  }

  async connect() { //Take the userId of the other user as argument here
    this.socket = webSocket('wss://holagraph-indiaclap.herokuapp.com/messages/7/?token=' + this.token); //Replace 5 with the userId
    this.socket.asObservable().subscribe(newMessage => { //Receive the message from backend which was sent and append it in chat body HTML 
      console.log(newMessage);
    })
  }

  getMessages() {
    return this._http.get(`${config.base_url}/messages/7/`); 
  }
  usersList() {
    return this._http.get(`${config.base_url}/messages/connections/`); 
  }
}
