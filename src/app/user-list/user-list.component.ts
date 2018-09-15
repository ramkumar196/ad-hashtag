import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import {MatSnackBar} from '@angular/material';
import {ApiService} from '../services/api.service';
import {UserService} from '../services/user.service';
import {AdsService} from '../services/ads.service';
import { JwtService } from '../services/jwt.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

 filterDate = [];
 adList;
 deviceCols = 1;
 userdetails = {};

  constructor(private adservice :AdsService,private userservice :UserService,private router :Router , private snackBar :MatSnackBar ,private dialog : MatDialog) { }

  detectDevice() { 
   if( navigator.userAgent.match(/Android/i)
   || navigator.userAgent.match(/webOS/i)
   || navigator.userAgent.match(/iPhone/i)
   || navigator.userAgent.match(/iPad/i)
   || navigator.userAgent.match(/iPod/i)
   || navigator.userAgent.match(/BlackBerry/i)
   || navigator.userAgent.match(/Windows Phone/i)
   ){
      return 1;
    }
   else {
      return 0;
    }
  }

  viewAd(id) {
         this.router.navigate(['/ad/view/'+id]);
  }

  editAd(id)
  {
     this.router.navigate(['/auth/ad-edit/'+id]);
  }

  deleteAd(id)
  {
  this.adservice
      .deleteAd(id)
      .subscribe(
        data => {
          console.log("data",data);
           this.openSnackBar('success');
           this.router.navigate(['/user/ad-list'])
        },
        err => {
          console.log("hereree",err);

          if(err.length == 0)
          {
            this.openSnackBar(err.error);
          }

        }
      ); 
      }  

    openSnackBar(msg) {
    this.snackBar.open(msg)
    }

  ngOnInit() {
  	 this.adservice.userAdList(this.filterDate)
      .subscribe( data => {
        this.adList = data.details;

      })
      if(this.detectDevice())
      {
        this.deviceCols = 3
      }
      else
      {
        this.deviceCols = 1;
      }

       this.userservice.profile()
      .subscribe( data => {
        this.userdetails = data.details;
      })
  }
 
}