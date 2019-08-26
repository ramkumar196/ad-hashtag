import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSnackBar} from '@angular/material';
import { DialogService } from 'src/app/services/dialog.service';
import { UserService } from 'src/app/services/user.service';
import { JwtService } from 'src/app/services/jwt.service';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

 passwordForm :FormGroup;
  errors = {};
  isSubmitting;


  constructor(private route: ActivatedRoute,private dialog: DialogService,private fb: FormBuilder,private userservice :UserService, private router :Router, private snackBar :MatSnackBar ,private jwt :JwtService) { 
  	    this.createForm();
  }

  createForm()
  {
  	 this.passwordForm = this.fb.group({
  		newpassword: ['', [Validators.required]],
  		confirmpassword: ['', [Validators.required]]
  	    }, { validator: this.checkPasswords });
  }


  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.controls.newpassword.value;
    let confirmPass = group.controls.confirmpassword.value;

    return pass === confirmPass ? null : { notSame: true }
  }
 
   SubmitPassword()
  {
  	 this.isSubmitting = true;
     //this.errors = new Errors();
  	this.route.params.subscribe(params => { 
    const inputdata = this.passwordForm.value;
    inputdata.resetcode =  params['id'];
    this.userservice
    .resetPassword(inputdata)
    .subscribe(
      data => {
        console.log("data",data);
        this.dialog.confirm({title:'Change Password',message:'Password changed succesfully',confirm:false})
        this.router.navigate(['/'])
      },
      err => {
        console.log("hereree",err.error.message);
        this.dialog.confirm({title:'Error',message:err.error.message,confirm:false})

        //this.openSnackBar(err.error);

        this.errors = err.error;

        this.isSubmitting = false;
      });
    })
	}


  ngOnInit() {
  }

}

