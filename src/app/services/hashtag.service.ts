import { Injectable } from '@angular/core';
import {ApiService} from './api.service';
import { Headers, Http, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { UserModel } from '../model/user-model';
import { throwError } from 'rxjs';





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
}

