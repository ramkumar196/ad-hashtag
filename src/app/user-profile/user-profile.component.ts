import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSnackBar} from '@angular/material';


import {ApiService} from '../services/api.service';
import {UserService} from '../services/user.service';
import { JwtService } from '../services/jwt.service';

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
    description:''
  };


  constructor(private fb: FormBuilder,private userservice :UserService, private router :Router, private snackBar :MatSnackBar ,private jwt :JwtService) { 
  	    this.createForm();
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
		profileImage: ['file']
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
    this.snackBar.open(msg, 'Undo',{
	  duration: 3000
    });
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
  

  ngOnInit() {
     this.userservice.profile({})
      .subscribe( data => {
        this.profile_image = data.details.profileImage;
        this.editProfileForm.setValue(data.details);

      })
  }

}
