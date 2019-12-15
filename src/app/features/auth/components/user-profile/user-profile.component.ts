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
  profileImage;
  errors = {
    username:'',
    email:'',
    phone:'',
    address:'',
    business_name:'',
     business_description:'',
     business_address:'',
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
		business_address: [''],
    business_description: [''],
		profile_image: ['file'],
    business_name:[''],
    user_type:[false]
    });
  }

    updateProfile()
  {
     this.isSubmitting = true;
     //this.errors = new Errors();

    const inputdata = this.editProfileForm.value;

    inputdata.profile_image = this.profileImage;
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
        this.openSnackBar(err.error.message);
        //}

        this.errors = err.error.errors;

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
        this.profileImage=  fileReader.result;
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
    this.profileImage = '';
  }

  changeBusiness(userType)
  {
    console.log("gdfxdhgdfh");
    console.log(this.editProfileForm.value.user_type);
  }
  

  ngOnInit() {
     this.userservice.profile({})
      .subscribe( data => {
        this.profileImage = data.profile_image;
         let profileArray = {
          username:'',
          email:'',
          phone:'',
          business_address:'',
          business_description:'',
          profile_image:'',
          business_name:'',
          user_type:false
          };
          if(typeof(data.business_address) != 'undefined')
          profileArray.business_address = data.business_address;

          if(typeof(data.business_description) != 'undefined')
          profileArray.business_description = data.business_description;

          if(typeof(data.email) != 'undefined')
          profileArray.email = data.email;

           if(typeof(data.phone) != 'undefined')
          profileArray.phone = data.phone;

          if(typeof(data.profile_image) != 'undefined')
          profileArray.profile_image = data.profile_image;

          if(typeof(data.username) != 'undefined')
          profileArray.username = data.username;

          if(typeof(data.business_name) != 'undefined')
          profileArray.business_name = data.business_name;

          if(typeof(data.user_type) != 'undefined')
          profileArray.user_type = data.user_type;

        this.editProfileForm.setValue(profileArray);

      },
      err =>{
        console.log(err);

        if(err.header.status == 401)
        this.logout();
        else
        this.openSnackBar(err.error.message);

      }
      )
  }

}
