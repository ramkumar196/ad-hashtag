import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSnackBar } from '@angular/material';
import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, OnDestroy } from '@angular/core';
import { DialogService } from 'src/app/services/dialog.service';
import { UserService } from 'src/app/services/user.service';
import { JwtService } from 'src/app/services/jwt.service';
import { Observable } from 'rxjs';
import { Country } from 'src/app/model/country-model';
import countryData from 'src/app/json/country';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  filteredStates: Observable<Country[]>;

  countryList: Country[] = countryData;
  filteredCountries: Observable<Country[]>;

  public signUpForm: FormGroup;
  isSubmitting;
  errors = {
    username: '',
    email: '',
    phone: '',
    password: '',
    country_code: '',
  };
  hide = true;
  checkMobile = false;

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;


  constructor(private fb: FormBuilder, private dialog: DialogService, private userservice: UserService, private router: Router, private snackBar: MatSnackBar, private jwt: JwtService, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.createForm();

  }

  createForm() {
    this.signUpForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      password: ['', Validators.required],
      country_code: ['91', Validators.required]
    });
  }

  SubmitSignup() {
    this.isSubmitting = true;
    //this.errors = new Errors();

    const inputdata = this.signUpForm.value;
    this.userservice
      .signup(inputdata)
      .subscribe(
        data => {

          console.log("data", data);

          var jwt_token = data.token;
          this.jwt.saveToken(jwt_token);
          //this.openSnackBar('success');
          this.dialog.confirm({ title: 'Login', message: 'Logged in Successfully', confirm: false })

          this.router.navigate(['/ad/list'])
        },
        err => {
          console.log("hereree", err);

          // if(err.length == 0)
          //{
          this.openSnackBar(err.error.message, 'close');
          //}

          this.errors = err.error.errors;

          // if(this.errors.username)
          // this.signUpForm.controls['username'].setErrors({'incorrect': true});

          // if(this.errors.email)
          // this.signUpForm.controls['email'].setErrors({'incorrect': true});

          // if(this.errors.phone)
          // this.signUpForm.controls['phone'].setErrors({'incorrect': true});

          this.isSubmitting = false;
        }
      );
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  private _filter(value): Country[] {
    const filterValue = value.toLowerCase();

    return this.countryList.filter(option => option.name.toLowerCase().includes(filterValue));
  }
  ngOnInit() {

    this.filteredCountries = this.signUpForm.get('country_code').valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }


}
