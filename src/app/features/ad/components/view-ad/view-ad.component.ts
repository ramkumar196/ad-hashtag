import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import {FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSnackBar} from '@angular/material';
import { DialogInputService } from 'src/app/services/dialoginput.service';
import { AdsService } from 'src/app/services/ads.service';

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


  constructor(private fb: FormBuilder,private dialoginput:DialogInputService,private adsService :AdsService,private router :Router, private snackBar :MatSnackBar, private route: ActivatedRoute ) { 
this.createForm()
  }

   ngOnInit() {

  	this.sub = this.route.params.subscribe(params => {
       this.id = params['id']; // (+) converts string 'id' to a number

       console.log('params',params);
       this.viewCount();


       this.adsService.adDetails(this.id)
      .subscribe( data => {
      	 this.ad = data.details;
         this.messageList = data.details.messageList;


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

    viewCount()
    {
      var inputdata = {adid:this.id};
      console.log(inputdata);
      this.adsService.viewCount(inputdata)
      .subscribe( data => {
        console.log("view count......");
       })
    }

    userExists(arr,item)
    {
      console.log("arr",arr);
      console.log("item",item);
      let result = false;
       for (var i=0; i < arr.length; i++) {
          if (arr[i].userid === item) {
              return true;
          }
      }

    }

    updateFav(status)
    {
      var inputdata = {adid:this.id,status:status}; 
      this.adsService.updateFav(inputdata)
      .subscribe( data => {
      this.adsService.adDetails(this.id)
      .subscribe( data => {
        this.ad = data.details;

        if(status == 0)
        this.openSnackBar("Added to Favourites",'close');
        else
        this.openSnackBar("Removed from Favourites",'close');

      })

       })
    }

    
   concatImageUrl(url,image)
  {
    return url+image;
  }


    replyMessage(Msg,id,adID)
    {
      console.log('herere',{message:Msg,Msgid:id,adid:adID});
      this.adsService.replyMessage({message:Msg,Msgid:id,adid:adID})
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

    openTextBox(id,adID)
    {
      this.dialoginput.showinputbox({title:'Login',message:'Logged in Successfully',confirm:false}).subscribe(result => {
        this.replyMessage(result,id,adID);
    });
    }

    openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

     ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
