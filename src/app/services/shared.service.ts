import { Injectable } from '@angular/core';
import {ApiService} from './api.service';
import { Headers, Http, Response, URLSearchParams } from '@angular/http';
import { Observable ,  throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { UserModel } from '../model/user-model';
import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, OnDestroy} from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class SharedService {
  
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(    private apiService: ApiService,changeDetectorRef: ChangeDetectorRef, media: MediaMatcher
) { 
  	this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    
        console.log(this.mobileQuery);

  }

  check()
  {
  	return this.mobileQuery.matches;
  }

}

