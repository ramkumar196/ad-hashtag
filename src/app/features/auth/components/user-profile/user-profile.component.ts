import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSnackBar} from '@angular/material';
import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef} from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { JwtService } from 'src/app/services/jwt.service';
import { DialogService } from 'src/app/services/dialog.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  editProfileForm :FormGroup;
  isSubmitting;
  profile_image;
  errors = {
    username:'',
    email:'',
    phone:'',
    address:'',
    description:'',
     businessName:'',
     userType:''

  };

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(private fb: FormBuilder,private userservice :UserService, private router :Router, private snackBar :MatSnackBar ,private jwt :JwtService,private dialog :DialogService,changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) { 
  	    this.createForm();
         this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  createForm()
  {
  	this.editProfileForm = this.fb.group({
		username: ['', Validators.required],
		email: ['', [Validators.required,Validators.email] ],
		phone: ['', Validators.required],
		//password: [''],
		address: [''],
    description: [''],
		profileImage: ['file'],
    businessName:[''],
    userType:[false]
    });
  }

    updateProfile()
  {
     this.isSubmitting = true;
     //this.errors = new Errors();

    const inputdata = this.editProfileForm.value;

    inputdata.profileImage = this.profile_image;
    this.userservice
    .updateProfile(inputdata)
    .subscribe(
      data => {
        console.log("data",data);
         this.openSnackBar('Profile Updated Successfully');
         this.router.navigate(['/user/profile'])
      },
      err => {
        console.log("hereree",err);

        // if(err.length == 0)
        // {
        //   this.openSnackBar(err.error);
        // }

        this.errors = err.error;

        this.isSubmitting = false;
      }
    );  }

    openSnackBar(msg) {
    this.snackBar.open(msg, 'close',{
	  duration: 3000
    });
    }

      logout()
      {
        this.jwt.destroyToken();
        this.dialog.confirm({title:'Logout',message:'Logged out Successfully',confirm:false})

        this.router.navigate(['/auth/login']);
      }


    onFileChanged(event: any) {

    if (event.target.files && event.target.files[0]) {

      if (!this.validateFile(event.target.files[0].name)) {
     this.openSnackBar('File Format not supported');
    return false;
    }

      const fileReader: FileReader = new FileReader();

        fileReader.readAsDataURL(event.target.files[0]); // read file as data url

      fileReader.onload = (event: Event) => {
        this.profile_image=  fileReader.result;
      }
    }
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

  removeImage()
  {
    this.profile_image = '';
  }

  changeBusiness(userType)
  {
    console.log("gdfxdhgdfh");
    console.log(this.editProfileForm.value.userType);
  }
  

  ngOnInit() {
     this.userservice.profile({})
      .subscribe( data => {
        this.profile_image = data.details.profileImage;
         let profileArray = {
          username:'',
          email:'',
          phone:'',
          address:'',
          description:'',
          profileImage:'',
          businessName:'',
          userType:false
          };
          if(typeof(data.details.address) != 'undefined')
          profileArray.address = data.details.address;

          if(typeof(data.details.description) != 'undefined')
          profileArray.description = data.details.description;

          if(typeof(data.details.email) != 'undefined')
          profileArray.email = data.details.email;

           if(typeof(data.details.phone) != 'undefined')
          profileArray.phone = data.details.phone;

          if(typeof(data.details.profileImage) != 'undefined')
          profileArray.profileImage = data.details.profileImage;

          if(typeof(data.details.username) != 'undefined')
          profileArray.username = data.details.username;

          if(typeof(data.details.businessName) != 'undefined')
          profileArray.businessName = data.details.businessName;

          if(typeof(data.details.userType) != 'undefined')
          profileArray.userType = data.details.userType;

        this.editProfileForm.setValue(profileArray);

      })
  }

}
