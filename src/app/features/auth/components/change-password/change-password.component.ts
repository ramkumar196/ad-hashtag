import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSnackBar} from '@angular/material';
import { DialogService } from 'src/app/services/dialog.service';
import { UserService } from 'src/app/services/user.service';
import { JwtService } from 'src/app/services/jwt.service';
import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, OnDestroy} from '@angular/core';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

 passwordForm :FormGroup;
  errors = {};
  isSubmitting;

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;


  constructor(private route: ActivatedRoute,private dialog: DialogService,private fb: FormBuilder,private userservice :UserService, private router :Router, private snackBar :MatSnackBar ,private jwt :JwtService,changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) { 
        this.createForm();
        this.mobileQuery = media.matchMedia('(max-width: 600px)');
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);
  }

  createForm()
  {
  	 this.passwordForm = this.fb.group({
      email: ['', [Validators.required,Validators.email]],
      password: ['', [Validators.required]],
  		password_confirmation: ['', [Validators.required]]
  	    }, { validator: this.checkPasswords });
  }


  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.controls.password.value;
    let confirmPass = group.controls.password_confirmation.value;

    return pass === confirmPass ? null : { notSame: true }
  }
 
   SubmitPassword()
  {
  	 this.isSubmitting = true;
     //this.errors = new Errors();
  	this.route.params.subscribe(params => { 
    const inputdata = this.passwordForm.value;
    inputdata.token =  params['id'];
    this.userservice
    .resetPassword(inputdata)
    .subscribe(
      data => {
        console.log("data",data);
        this.dialog.confirm({title:'Change Password',message:'Password changed succesfully',confirm:false})
        this.router.navigate(['/'])
      },
      err => {
        console.log("hereree",err);
        //this.dialog.confirm({title:'Error',message:err.error.message,confirm:false})

        this.openSnackBar(err.error.message,'close');

        this.errors = err.error;

        this.isSubmitting = false;
      });
    })
  }
  
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
    }
 

  ngOnInit() {
  }

}

