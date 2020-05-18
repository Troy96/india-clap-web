import { Component, OnInit } from '@angular/core';
import { ChatService } from './chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  connectionsList:any=[];
  constructor(
    private _chat: ChatService
  ) { }

  ngOnInit() {
    //this._chat.sendData('test');
    this._chat.getMessages().
      subscribe(data => {
        console.log(data);
        console.log(this._chat.socket)
        this._chat.connect();
      })
      this._chat.usersList().subscribe((data)=>{
        console.log(data)
        this.connectionsList=data;
      })
  }
  userDetail(detail:any){
    console.log(detail);
  }
}
