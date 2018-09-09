import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import {MatSnackBar} from '@angular/material';
import {ApiService} from '../services/api.service';
import {AdsService} from '../services/ads.service';
import { JwtService } from '../services/jwt.service';

@Component({
  selector: 'app-ad-list',
  templateUrl: './ad-list.component.html',
  styleUrls: ['./ad-list.component.css']
})
export class AdListComponent implements OnInit {

 filterDate = [];
 adList;
 deviceCols = 1;

  constructor(private adservice :AdsService,private router :Router , private snackBar :MatSnackBar ,private dialog : MatDialog) { }

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

  editAd(id)
  {
     this.router.navigate(['/user/ad-edit/'+id]);
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
  }
 
}
