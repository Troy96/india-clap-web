import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ChatService } from './chat.service';
import { AuthServices } from '../services/auth.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  messageList: any[];
  selectedUser: number; //Will get this after user clicks on a user from sidelist
  currentUser: number = JSON.parse(localStorage.getItem('currentUser'))['user_id'];

  currentUserDetails: any;
  selectedUserDetails: any;

  connectionsList: any = [];

  userMap = {};
  @ViewChild('textArea', { static: false }) textAreaRef: ElementRef;
  constructor(
    private _chat: ChatService,
    private _user: AuthServices
  ) {
  }

  ngOnInit() {
    this._chat.usersList().subscribe((data) => {
      this.connectionsList = data;
      this.selectedUser = this.connectionsList[0]['id'];
      this.getCurrentUserDetails();

      console.log(this.selectedUser);
      this.getSelectedUserDetails();
      this._chat.getMessages(this.selectedUser).
        subscribe(data => {
          this.messageList = [...data];
          this._chat.connect(this.selectedUser);
        })
    })
    this._chat.newMessage$.subscribe(
      data => {
        console.log(data, this.userMap)
        if (!data) return;
        this.messageList.push({
          message: data.message,
          user: {
            photo: this.userMap[data.id]['photo'],
            first_name: data.first_name,
            last_name: data.last_name
          },
          timestamp: new Date()
        })
      }
    )
  }

  userDetail(detail: any) {
    console.log(detail);
  }

  selectUser(id: number) {
    this.selectedUser = id;
    this.getSelectedUserDetails();
    this._chat.getMessages(this.selectedUser)
      .subscribe(data => {
        this.messageList = [...data];
        this._chat.connect(this.selectedUser);
      })
  }

  getUsers() { } //For Side bar users.

  onSendMessage(message: string) {
    this._chat.sendMessage(message);
    this.textAreaRef.nativeElement.value = ''
  }

  getCurrentUserDetails() {
    this.currentUser== JSON.parse((localStorage.getItem('currentUser')))
    console.log(this.currentUser)
    let id=this.currentUser;
    this._user.get_user_details(id)
      .subscribe(
        data => {
          this.currentUserDetails = { ...data }
          this.userMap[data.id] = { ...data };
          console.log(this.userMap)
          this.getSelectedUserDetails();
          console.log(data)
        //  this.getSelectedUserDetails();
        }
      )
  }

  getSelectedUserDetails() {
    this.selectedUser = this.connectionsList[0].id;

    console.log(this.selectedUser)
    this._user.get_user_details(this.selectedUser)
      .subscribe(
        data => {
          this.selectedUserDetails = { ...data }
          this.userMap[data.id] = { ...data }
          console.log(this.userMap)
                }
      )
  }

}
