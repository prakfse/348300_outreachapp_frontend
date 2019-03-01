import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { User } from '../models/user';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  noAuthHeader = {headers: new HttpHeaders({'NoAuth' : 'True' })};

  constructor(private httpClient: HttpClient) { }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  // Http Requests
  // Add New User
  addUser(body){
    return this.httpClient.post(environment.apiBaseUrl +'/addUser', body, this.noAuthHeader );
  }

  // Login
  login(authCredentials){
    return this.httpClient.post(environment.apiBaseUrl +'/authenticate', authCredentials, this.noAuthHeader);
  }

  // Get the User List from User collections 
  getUserList(){
    return this.httpClient.get(environment.apiBaseUrl +'/userlist');
  }

  getUserProfile(){
    return this.httpClient.get(environment.apiBaseUrl +'/userProfile');
  }

  setToken(token: string){
    localStorage.setItem('token' , token);
  }

  deleteToken(){
    localStorage.removeItem('token');
  }
  
  getToken(){
    return localStorage.getItem('token');
  }

  getUserPayload(){
    var token = this.getToken();

    if(token){
      var userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    }
    else
      return null;
  }

  isLoggedIn(){
    var userPayload = this.getUserPayload();
    if(userPayload)
      return userPayload.exp > Date.now()/1000;
    else
      return null;
  }
}
