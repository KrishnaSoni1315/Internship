import { Component } from '@angular/core';
import {ChatServiceService} from './chat-service.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
  // providers: [ChatServiceService]
})

export class AppComponent {
  
  user : String;
  room : String; 
  messageText : string;
  messageArray:Array<{user:String,message:String}> = [];

  constructor(private chatService : ChatServiceService){
    this.chatService.newUserJoined().subscribe(
      data=>{
        this.messageArray.push(data);
      });

      this.chatService.userLeftRoom().subscribe(
        data=>{
          this.messageArray.push(data);
        });

        this.chatService.sendMessage().subscribe(
          data=>{
            this.messageArray.push(data);
          });  
  }

  join(){
    this.chatService.joinRoom({user:this.user, room: this.room});
  }

  leave(){
    this.chatService.leaveRoom({user:this.user, room: this.room});
  }

  sendMessage(){
    this.chatService.message({user:this.user, room: this.room, message:this.messageText});
    this.messageText = "";
  }
}
