import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import {MatSnackBar} from '@angular/material';
import { AdsService } from 'src/app/services/ads.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

 filterDate = [];
 adList;
 deviceCols = 1;
 userdetails = {
   profileImage:'',
   username:'',
   description:'',
   address:'',
   businessName:'',
   userType:false,
   follower_list:[],
   following_list:[],
   selfStatus:0,
   followStatus:0
 };
 private sub: any;
 userid;

  constructor(private route: ActivatedRoute,private adservice :AdsService,private userservice :UserService,private router :Router , private snackBar :MatSnackBar ,private dialog : MatDialog) { }

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
     this.router.navigate(['/ad/edit/'+id]);
  }

  deleteAd(id)
  {
  this.adservice
      .deleteAd(id)
      .subscribe(
        data => {
          console.log("data",data);
           this.openSnackBar('success','close');
           this.refreshList();
           this.router.navigate(['/user/list'])
        },
        err => {
          console.log("hereree",err);

          if(err.length == 0)
          {
            this.openSnackBar(err.error,'close');
          }

        }
      ); 
      } 

    refreshList()
    {
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

    followUser(status)
    {
      this.userservice.follow({userid:this.userid,status:status})
      .subscribe( data => {
        this.userRefresh();
                   this.openSnackBar('success','close');

      })
    }


      openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
  
  followStatus(){
  var follow = this.userdetails.follower_list.filter(x => x.userid === this.userid);

  console.log(this.userdetails.follower_list);
  console.log(follow);
  return follow.length;
  }

   concatImageUrl(url,image)
  {
    return url+image;
  }

  userRefresh()
  {
  this.userservice.profile({userid:this.userid})
      .subscribe( data => {
        this.userdetails = data.details;
      })
    }

  updateFav(id,status)
  {
    var inputdata = {adid:id,status:status}; 
    this.adservice.updateFav(inputdata)
    .subscribe( data => {
      this.adservice.userAdList({userid:this.userid})
      .subscribe( data => {
        this.adList = data.details;

      })
      if(status == 0)
      this.openSnackBar("Added to Favourites",'close');
      else
      this.openSnackBar("Removed from Favourites",'close');

     })
  }

  ngOnInit() {

    this.sub = this.route.params.subscribe(params => {
       this.userid = params['id']; // (+) converts string 'id' to a number

       console.log('params',params);
  	 this.adservice.userAdList({userid:this.userid})
      .subscribe( data => {
        this.adList = data.details;

      })
      this.userservice.profile({userid:this.userid})
      .subscribe( data => {
        this.userdetails = data.details;
      })
      
    });


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
