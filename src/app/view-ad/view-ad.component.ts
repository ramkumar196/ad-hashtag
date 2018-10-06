import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import {FormGroup, FormBuilder, Validators } from '@angular/forms';
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
  messageList;
  rowSpan = 11;
  messageForm :FormGroup;


  constructor(private fb: FormBuilder,private adsService :AdsService,private router :Router, private snackBar :MatSnackBar, private route: ActivatedRoute ) { 
this.createForm()
  }

   ngOnInit() {
  	this.sub = this.route.params.subscribe(params => {
       this.id = params['id']; // (+) converts string 'id' to a number

       console.log('params',params);

       this.adsService.adDetails(this.id)
      .subscribe( data => {
      	 this.ad = data.details;
         this.messageList = data.details.message_list;


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


  createForm()
  {
     this.messageForm = this.fb.group({
      message: ['', [Validators.required]],
    });;
  }

    sendMessage()
    {
      var inputdata = this.messageForm.value;
      inputdata.adid =this.id; 
      console.log(inputdata);
      this.adsService.sendMessage(inputdata)
      .subscribe( data => {
         this.messageList = data.details;
         this.messageForm.reset();

         console.log(data.details);
        //this.postAdForm.setValue(data.details);
       })
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
