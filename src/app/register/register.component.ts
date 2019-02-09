import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSnackBar} from '@angular/material';


import {ApiService} from '../services/api.service';
import {UserService} from '../services/user.service';
import { DialogService } from '../services/dialog.service';
import { JwtService } from '../services/jwt.service';
import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, OnDestroy} from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

	public signUpForm :FormGroup;
  isSubmitting;
  errors = {
    username:'',
    email:'',
    phone:'',
    password:'',
  };
  hide=true;
  checkMobile = false;
  
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  

  constructor(private fb: FormBuilder,private dialog: DialogService,private userservice :UserService, private router :Router, private snackBar :MatSnackBar ,private jwt :JwtService,changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) { 
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
        this.createForm();

  }

  createForm()
  {
  	this.signUpForm = this.fb.group({
  		username: ['', Validators.required],
  		email: ['', [Validators.required,Validators.email] ],
      phone: ['', Validators.required],
  		password: ['', Validators.required],
    });
  }

  SubmitSignup()
  {
     this.isSubmitting = true;
     //this.errors = new Errors();

    const inputdata = this.signUpForm.value;
    this.userservice
    .signup(inputdata)
    .subscribe(
      data => {
        console.log("data",data);
        var jwt_token = data.token;
        this.jwt.saveToken(jwt_token);
         //this.openSnackBar('success');
        this.dialog.confirm({title:'Login',message:'Logged in Successfully',confirm:false})

         this.router.navigate(['/ad/list'])
      },
      err => {
        console.log("hereree",err.error);

       // if(err.length == 0)
        //{
          this.openSnackBar(err.error);
        //}

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

    openSnackBar(msg) {
    this.snackBar.open(msg)
    }

  ngOnInit() {
  }

  
}
