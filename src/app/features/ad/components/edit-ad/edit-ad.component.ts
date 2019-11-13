import { Component, OnInit ,OnDestroy, Inject} from '@angular/core';
import {FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSnackBar} from '@angular/material';
import {Observable} from 'rxjs';
import {switchMap, debounceTime, tap, finalize, map, startWith} from 'rxjs/operators';
import { AdsService } from 'src/app/services/ads.service';
import { UserService } from 'src/app/services/user.service';
import { JwtService } from 'src/app/services/jwt.service';
import { BrowserLocation } from 'src/app/services/browserlocation.service';
import { CustomValidator } from 'src/app/validators/customvalidator';
import { HashtagService } from 'src/app/services/hashtag.service';


export interface State {
  _id: string;
  name: string;
  state_id: string;
}


@Component({
  selector: 'app-edit-ad',
  templateUrl: './edit-ad.component.html',
  styleUrls: ['./edit-ad.component.css']
})
export class EditAdComponent implements OnInit, OnDestroy {

formControlValue = '';
  postAdForm :FormGroup;
  isSubmitting;
  showImageLoader = false;
  showHttpLoader = false;
  errors = {
    adtextarea:'',
    websitelink:'',
  };  
  files='';
  imageUrl=[];
  imageno=0;
  hashtags = ['sale','property','website'];
  id: number;
  private sub: any;
  coordinates =[];
  isLoading=false;
  filteredCities: Observable<State>;

  

  constructor(private route: ActivatedRoute,public hashtagService :HashtagService,private fb: FormBuilder,private adsService :AdsService,public userService :UserService,private router :Router, private snackBar :MatSnackBar ,private jwt :JwtService , private browsersLocation : BrowserLocation) { 
  	    this.createForm();

       this.postAdForm.get('city').valueChanges
      .pipe(
        debounceTime(300),
        tap(() => this.isLoading = true),
        switchMap(value => this.userService.cityList({keyword: value})
        .pipe(
          finalize(() => this.isLoading = false),
          )
        )
      )
      .subscribe(data => this.filteredCities = data);
  }

  createForm()
  {
  	this.postAdForm = this.fb.group({
      adtextarea: ['', Validators.required],
      websitelink: ['',[CustomValidator.urlValidator]],
      adImages: [''],
  		city: ['']
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

   this.showImageLoader = true;


	 if(this.imageno > 3)
	 {
	 	this.openSnackBar('You have maximum limit for upload','close');
    this.showImageLoader = false;

	 	return false;
	 }

	  if (event.target.files && event.target.files[0]) {

	  	if (!this.validateFile(event.target.files[0].name)) {
	 	this.openSnackBar('File Format not supported','close');
    this.showImageLoader = false;

		return false;
		}

      const fileReader: FileReader = new FileReader();

        fileReader.readAsDataURL(event.target.files[0]); // read file as data url

			fileReader.onload = (event: Event) => {
				this.imageUrl.splice(this.imageno, 0, fileReader.result);
				this.imageno++;
        setTimeout(()=>{   
        this.showImageLoader = false;
        }, 2000)
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
    cancelEdit()
    {
       this.router.navigate(['/user/list'])
    }


  createAd()
  {
     this.showHttpLoader = true;

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
         this.openSnackBar('success','close');
         this.showHttpLoader = false;

         this.router.navigate(['/user/account'])
      },
      err => {
        console.log("hereree",err);

        this.openSnackBar(err.error.message,'close');

        this.errors = err.error;

             this.showHttpLoader = false;


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

        if(data.ad_image_1 != '')
        {
        	this.imageUrl.push(data.ad_image_1)
        }
        if(data.ad_image_2 != '')
        {
        	this.imageUrl.push(data.ad_image_2)
        }
        if(data.ad_image_3 != '')
        {
        	this.imageUrl.push(data.ad_image_3)
        }
        if(data.ad_image_4 != '')
        {
        	this.imageUrl.push(data.ad_image_4)
        }
        
               console.log(data);

        var adDetails = {
          adtextarea:'',adImages:'',websitelink:'',city:''
        };

        adDetails.adtextarea = data.ad_text;
        adDetails.adImages = '';
        adDetails.websitelink = data.websitelink;
        adDetails.city = data.city;

        this.postAdForm.setValue(adDetails);

      })

       // In a real app: dispatch action to load the details here.
    });
  	
  }

  findChoices(searchText: string) {
    // return this.hashtags.filter(item =>
    //   item.toLowerCase().includes(searchText.toLowerCase())
    // );

    this.hashtagService.hashtaglist({'keyword':searchText})
    .subscribe(
      data => {    
        console.log("data",data);
        let hashtagArray = [];
        data.forEach(function(item,index)
        {
          hashtagArray.push(item.hashtag);
        })
        
        this.hashtags = hashtagArray;
        return this.hashtags;
      },
      err => {
        console.log("hereree",err);
  
      } 
      );
  }



  

  getChoiceLabel(choice: string) {
    return `#${choice} `;
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
