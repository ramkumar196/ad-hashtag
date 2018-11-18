import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, ActivatedRoute ,Router ,NavigationEnd } from '@angular/router';
import { HashtagService } from '../services/hashtag.service';
import { CommonService } from '../services/common.service';
import {ThemePalette} from '@angular/material/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  
  trendingHashtags;
  settings = {};
  colspanValue = 1;
  color: ThemePalette;
  
  constructor(private hashtagservice : HashtagService,private commonservice : CommonService,private router: Router,private route: ActivatedRoute ) {  }

  redirect(data)
  {
      this.router.navigate(['ad/list/'+data],{relativeTo:this.route});
  }


  ngOnInit() {
     this.hashtagservice.hashtaglist({keyword:'',all:true})
      .subscribe( data => {
        this.trendingHashtags = data.details;
      }) 

      this.commonservice.siteSettings({})
      .subscribe( data => {
        this.settings = data.details;
        console.log('settings',this.settings)
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
