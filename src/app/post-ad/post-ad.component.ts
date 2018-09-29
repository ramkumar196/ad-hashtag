import { Component, OnInit ,Input} from '@angular/core';
import {FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSnackBar} from '@angular/material';



import {ApiService} from '../services/api.service';
import {AdsService} from '../services/ads.service';
import { JwtService } from '../services/jwt.service';
import { BrowserLocation } from '../services/browserlocation.service';
import { HashtagService } from '../services/hashtag.service';



@Component({
  selector: 'app-post-ad',
  templateUrl: './post-ad.component.html',
  styleUrls: ['./post-ad.component.css']
})
export class PostAdComponent  implements OnInit {

  formControlValue = '';
  postAdForm :FormGroup;
  isSubmitting;
  errors = {};
  files='';
  imageUrl=[];
  imageno=0;
  hashtags:string[];
  coordinates =[];
  
  

  constructor(private fb: FormBuilder,private adsService :AdsService,public hashtagService :HashtagService,private router :Router, private snackBar :MatSnackBar ,private jwt :JwtService , private browsersLocation : BrowserLocation) { 
  	    this.createForm();
        this.hashtags = ['#sale',"#car"];
  }

  createForm()
  {
  	this.postAdForm = this.fb.group({
      adtextarea: ['', Validators.required],
  		adImages: ['']
  	  });
  }

  validateFile(name: String) {
  	console.log(name);
    var ext = name.substring(name.lastIndexOf('.') + 1);
    if (ext.toLowerCase() == 'png' || ext.toLowerCase() == 'jpeg'  || ext.toLowerCase() == 'jpg'  || ext.toLowerCase() == 'gif' ) {
        return true;
    }
    else {
        return false;
    }
	}
	
	onFileChanged(event: any) {
	 if(this.imageno > 3)
	 {
	 	this.openSnackBar('You have maximum limit for upload');
	 	return false;
	 }

	  if (event.target.files && event.target.files[0]) {

	  	if (!this.validateFile(event.target.files[0].name)) {
	 	this.openSnackBar('File Format not supported');
		return false;
		}

      const fileReader: FileReader = new FileReader();

        fileReader.readAsDataURL(event.target.files[0]); // read file as data url

			fileReader.onload = (event: Event) => {
				this.imageUrl.splice(this.imageno, 0, fileReader.result);
				this.imageno++;
				console.log('image no',this.imageno)
			}
		}
	}

	removeImage(item :any)
	{
			var index = this.imageUrl.indexOf(item);
			if (index !== -1) this.imageUrl.splice(index, 1);
			this.imageUrl.sort();
			this.imageno--;

			//this.imageUrl.splice(index, 1);
	}


  createAd()
  {
     this.isSubmitting = true;
     //this.errors = new Errors();

    const inputdata = this.postAdForm.value;
    inputdata.adImages = this.imageUrl;
    inputdata.coordinates = this.coordinates;
    this.adsService
    .createAd(inputdata)
    .subscribe(
      data => {
        console.log("data",data);
         this.openSnackBar('success');
         this.router.navigate(['/user/list'])
      },
      err => {
        console.log("hereree",err);

        if(err.length == 0)
        {
          this.openSnackBar(err.error);
        }

        this.errors = err.error;

        // if(this.errors.username)
        // this.signUpForm.controls['username'].setErrors({'incorrect': true});

        // if(this.errors.email)
        // this.signUpForm.controls['email'].setErrors({'incorrect': true});

        // if(this.errors.phone)
        // this.signUpForm.controls['phone'].setErrors({'incorrect': true});

        this.isSubmitting = false;
      }
    );  }

  ngOnInit() {
    this.browsersLocation.getLocation(window).subscribe(
        data => {

          this.coordinates.push(data.coords.latitude);
          this.coordinates.push(data.coords.longitude);
          console.log("data",data.coords);
        },
        err => {
          console.log("hereree",err);
        }
      );
      }  
  
   findChoices(searchText: string) {

    // console.log(this.hashtags);
    // this.hashtags = ['sale','property','website'];
    // return  this.hashtags;

    //    this.hashtagService.hashtaglist({'keyword':searchText})
    // .subscribe(
    //   data => {
        
    //     this.hashtags = data.details;
    //     return this.hashtags;
    //   },
    //   err => {
    //     console.log("hereree",err);

    //   } 
    //   );


  }

  getChoiceLabel(choice: string) {
    return `#${choice} `;
  }

   openSnackBar(msg) {
    this.snackBar.open(msg)
    }


}
