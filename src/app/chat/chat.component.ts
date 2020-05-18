import { Component, OnInit } from '@angular/core';
import { ChatService } from './chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  messageList: any[];

  constructor(
    private _chat: ChatService
  ) { }

  ngOnInit() {
    this._chat.getMessages().
      subscribe(data => {
        console.log(data); //Get List of messages. Store it and display it in chat body.
        this._chat.connect(); //Send the userId of the other user here as argument
      })
  }

  getUsers() { } //For Side bar users.

  onSendMessage(message: string) {
    console.log(message);
  }

}
