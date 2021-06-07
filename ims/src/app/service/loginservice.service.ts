// import { API_URL } from './../app.constants';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';

export const TOKEN = 'token'
export const AUTHENTICATED_USER = 'authenticaterUser'

@Injectable({
  providedIn: 'root'
})
export class LoginserviceService {

  constructor(private http: HttpClient) { }

  executeJWTAuthenticationService(username:string, password:string) {
    
    return this.http.post<any>(
      "http://localhost:9090/authenticate",{
        username,
        password
      }).pipe(
        map(
          data => {
            let returnData:string =data.token;
            if(returnData==="INVALID_CREDENTIALS")
            {
              localStorage.setItem("invalid_credentials",returnData)
            }
            else if(returnData==="USER_DISABLED")
            {
              localStorage.setItem("user_disabled",returnData)
            }
            else{
              localStorage.setItem(AUTHENTICATED_USER, username);
              localStorage.setItem(TOKEN, `Bearer ${data.token}`);
            }
           
            return data;
          }
        )
      );
  }



  getAuthenticatedUser() {
    return localStorage.getItem(AUTHENTICATED_USER)
  }

  getAuthenticatedToken() {
    if(this.getAuthenticatedUser())
      return localStorage.getItem(TOKEN)
      return ""
  }

  isUserLoggedIn() {
    let user = localStorage.getItem(AUTHENTICATED_USER)
    return !(user === null)
  }

  logout(){
    localStorage.removeItem(AUTHENTICATED_USER)
    localStorage.removeItem(TOKEN)
  }

}

