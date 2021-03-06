import { Injectable } from '@angular/core';
import {ApiService} from './api.service';
import { Headers, Http, Response, URLSearchParams } from '@angular/http';
import { Observable ,  throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { UserModel } from '../model/user-model';





@Injectable({
  providedIn: 'root'
})
export class AdsService {

  constructor(    private apiService: ApiService
) { }

   private formatErrors(error: any) {
     return throwError(error);
  }

  createAd(data): Observable<UserModel> {
    return this.apiService.post('/ad/create',data).pipe(
  	 catchError(this.formatErrors))
   } 

   editAd(data,id): Observable<UserModel> {
    return this.apiService.post('/ad/edit/'+id,data).pipe(
     catchError(this.formatErrors))
   }  

    userAdList(data){
    return this.apiService.post('/ad/mylist',data).pipe(
     catchError(this.formatErrors))
   }

    SearchAdList(data){
    return this.apiService.post('/ad/list',data).pipe(
     catchError(this.formatErrors))
   }

    adDetails(id){
    return this.apiService.post('/ad/detail/'+id).pipe(
     catchError(this.formatErrors))
   }
    deleteAd(id){
    return this.apiService.delete('/ad/delete/'+id).pipe(
     catchError(this.formatErrors))
   } 
    sendMessage(data){
    return this.apiService.post('/message/send',data).pipe(
     catchError(this.formatErrors))
   } 

    replyMessage(data){
    return this.apiService.post('/message/reply',data).pipe(
     catchError(this.formatErrors))
   }

    viewCount(data){
    return this.apiService.post('/fav/update-view-count',data).pipe(
     catchError(this.formatErrors))
   }

    updateFav(data){
    return this.apiService.post('/fav/update',data).pipe(
  	 catchError(this.formatErrors))
   }

   
}

