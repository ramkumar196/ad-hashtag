import { Component, OnInit } from '@angular/core';
import { HashtagService } from 'src/app/services/hashtag.service';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material';
import {FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  messageForm;

  constructor(private fb: FormBuilder,private hashtagservice :HashtagService,private userservice :UserService,private snackBar :MatSnackBar) { 
    this.createForm()
  }

  messageList =[];
  conversationList =[];

  createForm()
  {
     this.messageForm = this.fb.group({
      message: ['', [Validators.required]],
    });;
  }

    sendMessage(senderID,AdID)
  {
     var inputdata = this.messageForm.value;
     this.userservice.sendMessage({message:inputdata.message,user_id:senderID,ad_id:AdID})
     .subscribe( data => {
      this.openSnackBar("sent",'close');
      //this.messages();

     })

  }

  conversation()
  {
     this.userservice.conversationList({})
     .subscribe( data => {

     	this.conversationList = data;
     })

  }

  messages(id)
  {
     this.userservice.messageList({'conv_id':id})
     .subscribe( data => {

     	this.messageList = data;
     })

  }


     openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
    }

  ngOnInit() {

  	this.conversation()
  }

}
