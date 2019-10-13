import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {COMMA, ENTER} from '@angular/cdk/keycodes';

import {FormControl} from '@angular/forms';
import {FormBuilder, FormGroup} from '@angular/forms';
import {switchMap, debounceTime, tap, finalize, map, startWith} from 'rxjs/operators';
import {Observable} from 'rxjs'
import {MatAutocompleteSelectedEvent, MatChipInputEvent} from '@angular/material';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material';


import {MatSnackBar} from '@angular/material';
import { AdsService } from 'src/app/services/ads.service';
import { HashtagService } from 'src/app/services/hashtag.service';
import { UserService } from 'src/app/services/user.service';
import { NotifyComponent } from 'src/app/templates/notify/notify.component';



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
 adList = [];
 subHashtags = [];
 deviceCols = 1;
 usersForm: FormGroup;
 isLoading = false;
 notifyList=[];
 paginationMeta;

 searchCtrl = new FormControl();
 filteredHashtags: Observable<void |any []>;
 filteredCities: Observable<void |any []>;

 //chips

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = false;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  hashtagCtrl = new FormControl();
  cityCtrl = new FormControl();
  hashtags = [];
  showLoader = false;


  constructor(
    private route: ActivatedRoute,
    private adservice :AdsService,
    private hashtagservice :HashtagService,
    public userService :UserService,
    private router :Router ,
     private snackBar :MatSnackBar ,
     private dialog : MatDialog ,
     private fb: FormBuilder,
     private bottomSheet: MatBottomSheet
     ) { 
       this.cityCtrl
      .valueChanges
      .pipe(
        debounceTime(300),
        tap(() => this.isLoading = true),
        switchMap(value => this.userService.cityList({keyword: value})
        .pipe(
          finalize(() => this.isLoading = false),
          )
        )
      )
      .subscribe(data => this.filteredCities = data.details);


  }

  openBottomSheet(data): void {
    this.bottomSheet.open(NotifyComponent);
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
           this.openSnackBar('success','close');
           this.router.navigate(['/user/ad-list'])
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



  ngOnInit() {

    this.userService.notifyList({}).subscribe( data => {
    this.notifyList = data.details;

    if(this.notifyList.length > 0)
    {
      this.openBottomSheet({'message':data.notify_message});
    }

    })



     // this.adservice.SearchAdList(this.filterDate)
     //  .subscribe( data => {
     //    this.adList = data.details;

     //  })

     this.userService.profile({keyword:''})
      .subscribe( data => {
       // this.subHashtags = data.details.subList;

        //if(this.subHashtags.length > 0)
        //this.hashtags= this.hashtags.concat(this.subHashtags);

      })
     this.hashtagservice.hashtaglist({keyword:''})
      .subscribe( data => {
        this.filteredHashtags = data;

        console.log(this.filteredHashtags);

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
      .subscribe(data => this.filteredHashtags = data);
      if(this.detectDevice())
      {
        this.deviceCols = 3
      }
      else
      {
        this.deviceCols = 1;
      }

            this.hashtagCtrl
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
      .subscribe(data => this.filteredHashtags = data);

      if(this.detectDevice())
      {
        this.deviceCols = 3
      }
      else
      {
        this.deviceCols = 1;
      }

      this.route.params.subscribe(params => {
       var id = params['id'];
       console.log(id); 
       if(id != '' && typeof(id) != 'undefined')
       {
         this.hashtags.push(id);
         this.hashtagInput.nativeElement.value = '';
         this.hashtagCtrl.setValue(null);
         console.log("herrererere");
         this.adListing();
       }
       else
       {
          this.adListing(0);
       }
     })
  }

   adListing(page=0)
    {
      this.showLoader = true;
      console.log('hash',this.hashtags);
      var cityname = this.cityCtrl.value;

    this.adservice.SearchAdList({hashtags:this.hashtags,city: cityname , page : page})
      .subscribe( data => {
        this.adList = data.data;
        this.paginationMeta = data.meta;
        setTimeout(()=>{   
                  this.showLoader = false;
        }, 2000)
      })
    }

  @ViewChild('hashtagInput',{ read: true, static: false }) hashtagInput: ElementRef<HTMLInputElement>;


  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.hashtags.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.hashtagCtrl.setValue(null);
  }

  remove(hashtag: string): void {
    const index = this.hashtags.indexOf(hashtag);

    if (index >= 0) {
      this.hashtags.splice(index, 1);
    }
        this.adListing(0);

  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.hashtags.push(event.option.viewValue);
    this.hashtagInput.nativeElement.value = '';
    this.hashtagCtrl.setValue(null);
    console.log("herer000");
    this.adListing(0);
  }

    selectedcity(event: MatAutocompleteSelectedEvent): void {
          console.log("herer1111");

    this.adListing(0);
  }

     updateFav(id,status)
  {
    var inputdata = {adid:id,status:status}; 
    this.adservice.updateFav(inputdata)
    .subscribe( data => {
      this.adListing(0);
      if(status == 0)
      this.openSnackBar("Added to Favourites",'close');
      else
      this.openSnackBar("Removed from Favourites",'close');

     })
  }

    openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
    }
  // _filter(value: string): string[] {
  //   const filterValue = value.toLowerCase();

  //   return ;
  // }
  paginateAdListing(event)
  {
    let offset = event.pageSize * event.pageIndex
    this.adListing(offset);
  }
}
