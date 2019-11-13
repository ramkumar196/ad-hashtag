import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material';
import { HashtagService } from 'src/app/services/hashtag.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-subscription-list',
  templateUrl: './subscription-list.component.html',
  styleUrls: ['./subscription-list.component.css']
})
export class SubscriptionListComponent implements OnInit {

  constructor(private hashtagservice :HashtagService,private userservice :UserService,private snackBar :MatSnackBar) { }

  profileData ={};
  subList =[];
    Subscribe(id,status,hashtag)
  {
     this.hashtagservice.subscribe({status:status,hashtag_id:id})
     .subscribe( data => {
      this.openSnackBar("Unsubscribed",'close');
      this.Profile();

     })

  }

    Profile()
  {
     this.userservice.subscriberList({})
     .subscribe( data => {

     	this.subList = data;
     })

  }

     openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
    }

  ngOnInit() {

  	this.Profile()
  }

}
