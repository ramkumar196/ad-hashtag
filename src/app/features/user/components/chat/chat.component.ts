import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  isSidenavOpen='';

  constructor() { }

    activeChatUser = {
    name: 'Gevorg Spartak',
    photo: 'assets/images/face-2.jpg',
    isOnline: true,
    lastMsg: 'Hello!'
  };

  connectedUsers = [{
    name: 'Gevorg Spartak',
    photo: 'assets/images/face-2.jpg',
    isOnline: true,
    lastMsg: 'What\'s going!'
  }, {
    name: 'Petros Toros',
    photo: 'assets/images/face-4.jpg',
    isOnline: true,
    lastMsg: 'Send me the stories.'
  }, {
    name: 'Henrik Gevorg',
    photo: 'assets/images/face-5.jpg',
    isOnline: false,
    lastMsg: 'Great work!!'
  }, {
    name: 'Gevorg Spartak',
    photo: 'assets/images/face-6.jpg',
    isOnline: false,
    lastMsg: 'Bye'
  }, {
    name: 'Petros Toros',
    photo: 'assets/images/face-7.jpg',
    isOnline: true,
    lastMsg: 'We\'ll talk later'
  }]

  ngOnInit() {
  }

}
