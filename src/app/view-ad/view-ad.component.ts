import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSnackBar} from '@angular/material';
import {ApiService} from '../services/api.service';
import {AdsService} from '../services/ads.service';
import { JwtService } from '../services/jwt.service';

@Component({
  selector: 'app-view-ad',
  templateUrl: './view-ad.component.html',
  styleUrls: ['./view-ad.component.css']
})
export class ViewAdComponent implements  OnInit, OnDestroy {

  id: number;
  private sub: any;
  ad;
  rowSpan = 11;


  constructor(private adsService :AdsService,private router :Router, private snackBar :MatSnackBar, private route: ActivatedRoute ) { }

   ngOnInit() {
  	this.sub = this.route.params.subscribe(params => {
       this.id = params['id']; // (+) converts string 'id' to a number

       console.log('params',params);

       this.adsService.adDetails(this.id)
      .subscribe( data => {
      	 this.ad = data.details;

      	 console.log(this.ad);
        //this.postAdForm.setValue(data.details);
      		})
  		})
		  	if(this.detectDevice())
		      {
		        this.rowSpan = 5;
		      }
		      else
		      {
		        this.rowSpan = 11;
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


     ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
