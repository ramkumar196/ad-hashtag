import { Component, OnInit } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, OnDestroy} from '@angular/core';
import {MatSnackBar} from '@angular/material';
import { HashtagService } from 'src/app/services/hashtag.service';

@Component({
  selector: 'app-trending',
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.css']
})
export class TrendingComponent implements OnInit {
  colspanValue = 1;
  trendingHashtags = [];
  paginationMeta;
  setOffset=0;
   mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  constructor(private hashtagservice :HashtagService,changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,private snackBar :MatSnackBar) { 
  this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  Subscribe(id,status,hashtag)
  {
     this.hashtagservice.subscribe({status:status,hashtag_id:id})
     .subscribe( data => {
      this.hashtagList(this.setOffset);
      if(status == 0)
      this.openSnackBar("Subscribed",'close');
      else
      this.openSnackBar("Unsubscribed",'close');

     },err => {
      if(err.status == 401)
      {
        this.openSnackBar("Please login to subscribe",'close');
      }
    })
     

  }

   openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
    }

  hashtagList(offset)
  {
     this.hashtagservice.hashtagTrendingList({page : offset})
      .subscribe( data => {
        this.trendingHashtags = data.data;
        this.paginationMeta = data.meta;
      }) 
  }

  paginateAdListing(event)
  {
    console.log(event);
    let offset = event.pageIndex +1;
    this.hashtagList(offset);
    this.setOffset = offset;
  }
  ngOnInit() {
    this.hashtagList(0);
  }

}
