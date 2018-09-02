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
export class UserService {

  constructor(    private apiService: ApiService
) { }

   private formatErrors(error: any) {
     return throwError(error);
  }

  signup(data): Observable<UserModel> {
    return this.apiService.post('/user/signup',data).pipe(
  	 catchError(this.formatErrors))
   } 

   login(data): Observable<UserModel> {
    return this.apiService.post('/user/login',data).pipe(
  	 catchError(this.formatErrors))
   }
}