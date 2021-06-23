
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs/operators';
import { USERNAME, TOKEN, API_URL, USERROLE, USER_DISABLED, INVALID_CREDENTIALS, TOKENEXPTIME } from '../constentProvider';

@Injectable({
  providedIn: 'root'
})
export class LoginserviceService {

  constructor(private http: HttpClient) { }

  executeJWTAuthenticationService(username: string, password: string) {
    return this.http.post<any>(
      `${API_URL}/authenticate`, {
      username,
      password
    }).pipe(
      map(
        data => {
          let returnData: string = data.token;
          if (returnData === INVALID_CREDENTIALS) {
            localStorage.setItem(INVALID_CREDENTIALS, returnData)
          }
          else if (returnData === USER_DISABLED) {
            localStorage.setItem(USER_DISABLED, returnData)
          }
          else {
            const helper = new JwtHelperService();
            const decoded = helper.decodeToken(returnData);
            var roleAndName=decoded.aud;
            var splitted=roleAndName.split("_____");
            localStorage.setItem(USERROLE, splitted[0]);
            localStorage.setItem(USERNAME,splitted[1]);
            localStorage.setItem(TOKENEXPTIME, decoded.exp);
            localStorage.setItem(TOKEN, `Bearer ${data.token}`);
          }
          return data;
        }
      )
    );
  }

  getAuthenticatedUser() {
    return localStorage.getItem(USERNAME)
  }

  getAuthenticatedToken() {
    let token = localStorage.getItem(TOKEN);
    if (token == null) {
      return ""
    }
    return token
  }

  isUserLoggedIn() {
    let user = localStorage.getItem(USERNAME)
    return !(user === null)
  }

  logout() {
    localStorage.clear();
  }
}
