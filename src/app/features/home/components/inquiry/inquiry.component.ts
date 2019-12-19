import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {MatSnackBar} from '@angular/material';
import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, OnDestroy} from '@angular/core';
import { DialogService } from 'src/app/services/dialog.service';
import { UserService } from 'src/app/services/user.service';
import { JwtService } from 'src/app/services/jwt.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-inquiry',
  templateUrl: './inquiry.component.html',
  styleUrls: ['./inquiry.component.css']
})
export class InquiryComponent implements OnInit {


  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  inquiryForm :FormGroup;
  errors = {};
  isSubmitting;
  hide = true;


  constructor(private dialog: DialogService,private fb: FormBuilder,private commonservice :CommonService, private router :Router, private snackBar :MatSnackBar ,private jwt :JwtService,changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) { 
  	    this.createForm();
        this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  createForm()
  {
  	 this.inquiryForm = this.fb.group({
  		inquirer_name: ['', [Validators.required]],
      inquirer_email: ['', [Validators.required,Validators.email]],
      inquirer_message: ['', [Validators.required]]

    });;
  }

  sendInquiry()
  {
  	 this.isSubmitting = true;
     //this.errors = new Errors();

    const inputdata = this.inquiryForm.value;
    this.commonservice
    .sendInquiry(inputdata)
    .subscribe(
      data => {
        console.log("data",data);
        this.openSnackBar("Inquiry message sent!",'close');
        setInterval(()=>{
          this.router.navigate(['/'])
        },2000)
      },
      err => {
        console.log("hereree",err);
        //this.dialog.confirm({title:'Error',message:err,confirm:false})

        this.openSnackBar(err.error.message,'close');

        this.errors = err.error.error;

        this.isSubmitting = false;
      });
    }

    openSnackBar(message: string, action: string) {
      this.snackBar.open(message, action, {
        duration: 2000,
      });
      }

  ngOnInit() {
  }

} 

