import { Injectable } from '@angular/core';
import {ApiService} from './api.service';
import { Headers, Http, Response, URLSearchParams } from '@angular/http';
import { Observable ,  throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { UserModel } from '../model/user-model';





@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(    private apiService: ApiService
) { }

   private formatErrors(error: any) {
     return throwError(error);
  }

    siteSettings(data){
    return this.apiService.post('/common/settings',data).pipe(
     catchError(this.formatErrors))
   }
}

