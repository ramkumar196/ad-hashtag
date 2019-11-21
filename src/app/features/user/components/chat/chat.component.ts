import { Component, OnInit ,ViewChild} from '@angular/core';
import { HashtagService } from 'src/app/services/hashtag.service';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material';
import {FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { MatSidenav, MatDialog } from '@angular/material';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  messageForm;

  isMobile;
  userID;
  AdID;
  convID;
  screenSizeWatcher: Subscription;
  isSidenavOpen: Boolean = true;
  @ViewChild(MatSidenav, {static: false}) private sideNave: MatSidenav;

  constructor(private media: MediaObserver,private fb: FormBuilder,private hashtagservice :HashtagService,private userservice :UserService,private snackBar :MatSnackBar) { 
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

    sendMessage()
  {
     var inputdata = this.messageForm.value;
     this.userservice.sendMessage({message:inputdata.message,user_id:this.userID,ad_id:this.AdID})
     .subscribe( data => {
      this.openSnackBar("sent",'close');
      this.messages(this.convID);
      this.messageForm.reset();
     })

  }

  conversation()
  {
     this.userservice.conversationList({})
     .subscribe( data => {

       this.conversationList = data;

       if(typeof(this.userID) == 'undefined')
       {
        if(data[0].product_owner_status == 1)
        this.userID = data[0].sender_id;
        else
        this.userID = data[0].user_id;
       }

       if(typeof(this.AdID) == 'undefined')
       this.AdID = data[0].ad_id;

       this.convID =data[0].conversation_key;
       this.messages(this.convID);
     })

  }

  clearConversation(id)
  {
    this.userservice.deleteConversation({'conv_id':id})
     .subscribe( data => {
      this.conversation();
      this.openSnackBar("Conversation Deleted",'close');
     })
    
  }

  messages(id)
  {
     this.userservice.messageList({'conv_id':id})
     .subscribe( data => {

       this.messageList = data;

       if(data[0].product_owner_status == 1)
       this.userID = data[0].sender_id;
       else
       this.userID = data[0].user_id;

       this.AdID = data[0].ad_id;
       this.convID =data[0].conversation_key;

     })

  }


     openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
    }

    updateSidenav() {
      var self = this;
      setTimeout(() => {
        self.isSidenavOpen = !self.isMobile;
        self.sideNave.mode = self.isMobile ? 'over' : 'side';
      });
    }
    chatSideBarInit() {
      this.isMobile = this.media.isActive('xs') || this.media.isActive('sm');
      this.updateSidenav();
      this.screenSizeWatcher = this.media.media$.subscribe((change: MediaChange) => {
        this.isMobile = (change.mqAlias === 'xs') || (change.mqAlias === 'sm');
        this.updateSidenav();
      });
    }

  ngOnInit() {

    this.conversation();
    this.chatSideBarInit();

    setInterval(()=>{
      this.conversation();
    },60000)
  }

}
