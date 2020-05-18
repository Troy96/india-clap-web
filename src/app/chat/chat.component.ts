import { Component, OnInit } from '@angular/core';
import { ChatService } from './chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  constructor(
    private _chat: ChatService
  ) { }

  ngOnInit() {
    //this._chat.sendData('test');
    this._chat.getMessages().
      subscribe(data => {
        console.log(data);
        this._chat.connect();
      })
  }

}
