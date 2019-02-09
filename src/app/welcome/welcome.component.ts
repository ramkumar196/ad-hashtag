import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, ActivatedRoute ,Router ,NavigationEnd } from '@angular/router';
import { HashtagService } from '../services/hashtag.service';
import { AdsService } from '../services/ads.service';
import { CommonService } from '../services/common.service';
import {ThemePalette} from '@angular/material/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  sliderImages = [];
  trendingHashtags;
  colspanValue = 1;
  color: ThemePalette;
  settings={
    home_page_text:'',
    home_page_sub_text:'',
    slider_images:[]
  };
  home_page_text={};
  showNavigationArrows =false;
  showNavigationIndicators =true;
  adList = {};
  showLoader= false;
  
  constructor(private hashtagservice : HashtagService,private adservice :AdsService,private commonservice : CommonService,private router: Router,private route: ActivatedRoute ) {  }

  redirect(data)
  {
      this.router.navigate(['ad/list/'+data],{relativeTo:this.route});
  }

      removeLoader()
    {
      this.showLoader = false;
      console.log("show loader",this.showLoader);
    }

     viewAd(id) {
         this.router.navigate(['/ad/view/'+id]);
     }

     adListing(hashtags='')
    {
     this.showLoader = true;
       let input = [];
       if(hashtags != '')
       {
         input.push(hashtags);
       }
      this.adservice.SearchAdList({hashtags:input,city: '',limit:10})
        .subscribe( data => {
          this.adList = data.details;
            setTimeout(()=>{   
                  this.showLoader = false;
             }, 2000)
        })

    }



  ngOnInit() {

     this.hashtagservice.hashtaglist({keyword:'',all:true})
      .subscribe( data => {
        this.trendingHashtags = data.details;
        var firstHashtag = this.trendingHashtags[0].hashtag;
        this.adListing(firstHashtag);

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
