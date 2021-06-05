import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginserviceService {
  authenticateUser(user: string, pass: string) {
    if (user.length == 0 || pass.length == 0) {
    sessionStorage.setItem("name", user)
    sessionStorage.setItem("role", pass)
  
    return this.isLoggedIn();
    }
    return this.doUserLogout();
  }

  doUserLogout() {
    sessionStorage.clear();
    return true;
  }
  constructor() { }

  isLoggedIn() {
    if (sessionStorage.getItem("name") == null) {
      return false;
    }
    return true;
  }


}
