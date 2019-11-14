import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  constructor(private userservice :UserService,private snackBar :MatSnackBar) { }

  notifylist =[];
    notificationList()
  {
     this.userservice.notifyList({})
     .subscribe( data => {
      this.notifylist = data;
     })
  }

  notificationUpdate(id,status)
  {
     this.userservice.notifyUpdate({id:id,notification_status:status})
     .subscribe( data => {
      this.notificationList();
     })
  }

     openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
    }

  ngOnInit() {

  	this.notificationList()
  }

}
