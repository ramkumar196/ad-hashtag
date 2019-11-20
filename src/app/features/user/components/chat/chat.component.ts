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
       this.userID = data[0].user_id;

       if(typeof(this.AdID) == 'undefined')
       this.AdID = data[0].ad_id;

       if(typeof(this.convID) == 'undefined')
       this.convID =data[0].conversation_key;

       if(typeof(this.convID) == 'undefined')
       this.messages(this.convID);
     })

  }

  messages(id)
  {
     this.userservice.messageList({'conv_id':id})
     .subscribe( data => {

       this.messageList = data;
       this.userID = data[0].user_id;
       console.log(this.userID);
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

    // setInterval(()=>{
    //   this.conversation();
    // },10000)
  }

}
