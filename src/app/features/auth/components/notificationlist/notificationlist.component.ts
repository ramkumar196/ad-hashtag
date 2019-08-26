import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-notificationlist',
  templateUrl: './notificationlist.component.html',
  styleUrls: ['./notificationlist.component.css']
})
export class NotificationlistComponent implements OnInit {
  public notifyList = [];

  constructor(
    private userService: UserService

  ) { }

  ngOnInit() {
    this.userService.notifyList({}).subscribe( data => {
      this.notifyList = data.details;
     });
  }

}
