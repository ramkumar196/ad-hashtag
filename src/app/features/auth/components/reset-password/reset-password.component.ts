import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSnackBar} from '@angular/material';
import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, OnDestroy} from '@angular/core';
import { DialogService } from 'src/app/services/dialog.service';
import { UserService } from 'src/app/services/user.service';
import { JwtService } from 'src/app/services/jwt.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

 resetForm :FormGroup;
  errors = {};
  isSubmitting;

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;


  constructor(private dialog: DialogService,private fb: FormBuilder,private userservice :UserService, private router :Router, private snackBar :MatSnackBar ,private jwt :JwtService,changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) { 
  	    this.createForm();
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  createForm()
  {
  	 this.resetForm = this.fb.group({
  		username: ['', [Validators.required]],
    });
  }
 

   SubmitReset()
  {
  	 this.isSubmitting = true;
     //this.errors = new Errors();

    const inputdata = this.resetForm.value;
    this.userservice
    .sendResetLink(inputdata)
    .subscribe(
      data => {
        console.log("data",data);
        var jwt_token = data.token;
        this.dialog.confirm({title:'Reset Password',message:'Password reset link sent to email',confirm:false})
        this.router.navigate(['/'])
      },
      err => {
        console.log("hereree",err);
        this.dialog.confirm({title:'Error',message:err,confirm:false})

        //this.openSnackBar(err.error);

        this.errors = err.error;

        this.isSubmitting = false;
      });
    }


  ngOnInit() {
  }

}
