import { Injectable } from '@angular/core';
import {ApiService} from './api.service';
import { Headers, Http, Response, URLSearchParams } from '@angular/http';
import { Observable ,  throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { UserModel } from '../model/user-model';

@Injectable({
  providedIn: 'root'
})
export class HashtagService {

  constructor(    private apiService: ApiService
) { }

   private formatErrors(error: any) {
     return throwError(error);
  }

    hashtaglist(data){
    return this.apiService.post('/hashtag/list',data).pipe(
     catchError(this.formatErrors))
   } 
     subscribe(data){
    return this.apiService.post('/fav/subscribe',data).pipe(
     catchError(this.formatErrors))
   }
}

