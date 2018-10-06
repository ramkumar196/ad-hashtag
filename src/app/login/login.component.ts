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
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm :FormGroup;
  errors = {};
  isSubmitting;


  constructor(private dialog: DialogService,private fb: FormBuilder,private userservice :UserService, private router :Router, private snackBar :MatSnackBar ,private jwt :JwtService) { 
  	    this.createForm();
  }

  createForm()
  {
  	 this.loginForm = this.fb.group({
  		username: ['', [Validators.required]],
  		password: ['', [Validators.required]]
    });;
  }

  SubmitLogin()
  {
  	 this.isSubmitting = true;
     //this.errors = new Errors();

    const inputdata = this.loginForm.value;
    this.userservice
    .login(inputdata)
    .subscribe(
      data => {
        console.log("data",data);
        var jwt_token = data.token;
        this.jwt.saveToken(jwt_token);
        this.dialog.confirm({title:'Login',message:'Logged in Successfully',confirm:false})
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

    openSnackBar(msg) {
    this.snackBar.open(msg)
    }

  ngOnInit() {
  }

} 
