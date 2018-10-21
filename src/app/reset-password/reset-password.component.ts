import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSnackBar} from '@angular/material';


import {ApiService} from '../services/api.service';
import {UserService} from '../services/user.service';
import { JwtService } from '../services/jwt.service';
import { DialogService } from '../services/dialog.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

 resetForm :FormGroup;
  errors = {};
  isSubmitting;


  constructor(private dialog: DialogService,private fb: FormBuilder,private userservice :UserService, private router :Router, private snackBar :MatSnackBar ,private jwt :JwtService) { 
  	    this.createForm();
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
