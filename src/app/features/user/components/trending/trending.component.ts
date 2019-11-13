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
      this.hashtagList();
      if(status == 0)
      this.openSnackBar("Subscribed",'close');
      else
      this.openSnackBar("Unsubscribed",'close');

     })

  }

   openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
    }

  hashtagList()
  {
     this.hashtagservice.hashtaglist({keyword:'',all:true})
      .subscribe( data => {
        this.trendingHashtags = data;
      }) 
  }

  ngOnInit() {
  	     this.hashtagservice.hashtaglist({keyword:'',all:true})
      .subscribe( data => {
        this.trendingHashtags = data;
      }) 
  }

}
