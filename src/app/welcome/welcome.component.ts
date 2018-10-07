import { Component, OnInit } from '@angular/core';
import { HashtagService } from '../services/hashtag.service';
import {ThemePalette} from '@angular/material/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  
  trendingHashtags;
  colspanValue = 1;
  color: ThemePalette;
  
  constructor(private hashtagservice : HashtagService) {  }

  ngOnInit() {
  	 this.hashtagservice.hashtaglist({keyword:'',all:true})
      .subscribe( data => {
        this.trendingHashtags = data.details;
      })

      if(this.detectDevice())
      {
      	this.colspanValue = 4;
      }
  }

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
}
