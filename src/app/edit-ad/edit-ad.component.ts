import { Component, OnInit ,OnDestroy} from '@angular/core';
import {FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSnackBar} from '@angular/material';

import {ApiService} from '../services/api.service';
import {AdsService} from '../services/ads.service';
import { JwtService } from '../services/jwt.service';
import { BrowserLocation } from '../services/browserlocation.service';

@Component({
  selector: 'app-edit-ad',
  templateUrl: './edit-ad.component.html',
  styleUrls: ['./edit-ad.component.css']
})
export class EditAdComponent implements OnInit, OnDestroy {

formControlValue = '';
  postAdForm :FormGroup;
  isSubmitting;
  errors = {};
  files='';
  imageUrl=[];
  imageno=0;
  hashtags = ['sale','property','website'];
  id: number;
  private sub: any;
  coordinates =[];

  

  constructor(private route: ActivatedRoute,private fb: FormBuilder,private adsService :AdsService,private router :Router, private snackBar :MatSnackBar ,private jwt :JwtService , private browsersLocation : BrowserLocation) { 
  	    this.createForm();
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
    .editAd(inputdata,this.id)
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
      this.sub = this.route.params.subscribe(params => {
       this.id = params['id']; // (+) converts string 'id' to a number

       console.log('params',params);

       this.adsService.adDetails(this.id)
      .subscribe( data => {

        if(data.details.ad_image_1 != '')
        {
        	this.imageUrl.push(data.details.ad_image_1)
        }
        if(data.details.ad_image_2 != '')
        {
        	this.imageUrl.push(data.details.ad_image_2)
        }
        if(data.details.ad_image_3 != '')
        {
        	this.imageUrl.push(data.details.ad_image_3)
        }
        if(data.details.ad_image_4 != '')
        {
        	this.imageUrl.push(data.details.ad_image_4)
        }
        
        data.details.adtextarea = data.details.ad_text;
        data.details.adImages = '';
        delete data.details._id;
        delete data.details.ad_text;
        delete data.details.created_date;
        delete data.details.ad_image_1;
        delete data.details.ad_image_2;
        delete data.details.ad_image_3;
        delete data.details.ad_image_4;
        delete data.details.username;
        delete data.details.profileImage;
        this.postAdForm.setValue(data.details);

      })

       // In a real app: dispatch action to load the details here.
    });
  	
  }

  findChoices(searchText: string) {
    return this.hashtags.filter(item =>
      item.toLowerCase().includes(searchText.toLowerCase())
    );
  }

  getChoiceLabel(choice: string) {
    return `#${choice} `;
  }

   openSnackBar(msg) {
    this.snackBar.open(msg)
    }

     ngOnDestroy() {
    this.sub.unsubscribe();
  }

}