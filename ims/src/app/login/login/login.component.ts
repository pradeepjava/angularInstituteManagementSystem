import { Component, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  username: string = ''
  password: string = ''
  invalidLogin: boolean = false;
  static isLoggedIn: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  authenticateUser(user:string, pass:string) {
    if (user.length == 0 || pass.length == 0) {
      this.invalidLogin = true;
      LoginComponent.isLoggedIn=false;
      console.log(LoginComponent.isLoggedIn)
    }
    else{
      this.invalidLogin=false;
      LoginComponent.isLoggedIn=true;
      console.log(user,pass);
      console.log(LoginComponent.isLoggedIn)
    }
  }

}
