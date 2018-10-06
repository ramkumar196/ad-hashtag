import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import {FormControl} from '@angular/forms';
import {FormBuilder, FormGroup} from '@angular/forms';
import {switchMap, debounceTime, tap, finalize} from 'rxjs/operators';
import {Observable} from 'rxjs'

import {MatSnackBar} from '@angular/material';
import {ApiService} from '../services/api.service';
import {AdsService} from '../services/ads.service';
import { JwtService } from '../services/jwt.service';
import { HashtagService } from '../services/hashtag.service';

export interface Listing {
  show_text: string;
}

@Component({
  selector: 'app-ad-list',
  templateUrl: './ad-list.component.html',
  styleUrls: ['./ad-list.component.css']
})



export class AdListComponent implements OnInit {

 filterDate = [];
 adList;
 deviceCols = 1;
 usersForm: FormGroup;
 isLoading = false;


 searchCtrl = new FormControl();
 filteredHashtags: Observable<void |any []>;


  constructor(private adservice :AdsService,private hashtagservice :HashtagService,private router :Router , private snackBar :MatSnackBar ,private dialog : MatDialog ,private fb: FormBuilder) { 
  }

 // filterStates(value: string){

 //  const filterValue = value.toLowerCase();

 //  this.adservice.SearchAdList(this.filterDate)
 //      .subscribe( data => {
 //        //this.adList = data.details;
 //       return this.filteredHashtags =data.details;

 //    });

 //  }

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
     this.adservice.SearchAdList(this.filterDate)
      .subscribe( data => {
        this.adList = data.details;

      })
     this.hashtagservice.hashtaglist({keyword:''})
      .subscribe( data => {
        this.filteredHashtags = data.details;

      })
    this.usersForm = this.fb.group({
      hashtags: null
    })

      this.usersForm
      .get('hashtags')
      .valueChanges
      .pipe(
        debounceTime(300),
        tap(() => this.isLoading = true),
        switchMap(value => this.hashtagservice.hashtaglist({keyword: value})
        .pipe(
          finalize(() => this.isLoading = false),
          )
        )
      )
      .subscribe(data => this.filteredHashtags = data.details);
      if(this.detectDevice())
      {
        this.deviceCols = 3
      }
      else
      {
        this.deviceCols = 1;
      }
  }

   adListing()
    {
    this.adservice.SearchAdList(this.usersForm.value)
      .subscribe( data => {
        this.adList = data.details;
      })
    }
 
}
