import { Injectable,Inject } from '@angular/core';
import {ApiService} from './api.service';
import { Headers, Http, Response, URLSearchParams } from '@angular/http';
import { Observable ,  throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { UserModel } from '../model/user-model';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(   private apiService: ApiService
) { }

   private formatErrors(error: any) {
     return throwError(error);
  }

  signup(data): Observable<UserModel> {
    return this.apiService.post('/user/register',data).pipe(
  	 catchError(this.formatErrors))
   } 

   login(data): Observable<UserModel> {
    return this.apiService.post('/user/login',data).pipe(
     catchError(this.formatErrors))
   }

   updateProfile(data): Observable<UserModel> {
    return this.apiService.post('/user/update-profile',data).pipe(
     catchError(this.formatErrors))
   }

   profile(data){
    return this.apiService.post('/user/profile',data).pipe(
     catchError(this.formatErrors))
   }

   getprofile(data){

    var url= '/user/profile';

     if(typeof(data.user_id) != 'undefined')
     var url = '/user/profile/'+data.user_id;

    return this.apiService.post(url,{}).pipe(
     catchError(this.formatErrors))
   }

   sendResetLink(data){
    return this.apiService.post('/user/password/resetlink/',data).pipe(
     catchError(this.formatErrors))
   }

   resetPassword(data){
    return this.apiService.post('/user/password/reset',data).pipe(
     catchError(this.formatErrors))
   }

   cityList(data){
    return this.apiService.post('/city-list',data).pipe(
     catchError(this.formatErrors))
   }

   follow(data){
    return this.apiService.post('/user/update-follow',data).pipe(
     catchError(this.formatErrors))
   }

   followerList(data){
    return this.apiService.post('/user/follow-list',data).pipe(
     catchError(this.formatErrors))
   }

   subscriberList(data){
    return this.apiService.post('/user/subscriptions',data).pipe(
     catchError(this.formatErrors))
   }

   verifyToken(data){
    return this.apiService.post('/user/verify-token',data).pipe(
  	 catchError(this.formatErrors))
   }

   notifyList(data){
    return this.apiService.post('/user/notify-list',data).pipe(
  	 catchError(this.formatErrors))
   }

   notifyUpdate(data){
    return this.apiService.post('/user/notify-update',data).pipe(
  	 catchError(this.formatErrors))
   }

   sendMessage(data){
    return this.apiService.post('/message/send',data).pipe(
  	 catchError(this.formatErrors))
   }

   conversationList(data){
    return this.apiService.post('/conversation/list',data).pipe(
  	 catchError(this.formatErrors))
   }

   messageList(data){


    var id= '';

     if(typeof(data.conv_id) != 'undefined')
      id = data.conv_id;

    return this.apiService.post('/message/list/'+id,data).pipe(
  	 catchError(this.formatErrors))
   }

   deleteConversation(data){
    var id= '';

     if(typeof(data.conv_id) != 'undefined')
      id = data.conv_id;

    return this.apiService.delete('/conversation/delete/'+id).pipe(
  	 catchError(this.formatErrors))
   }


   


    checklogin(): Boolean {
      if(window.localStorage['jwtToken'])
      return true;
      else
      return false;
    }
}
