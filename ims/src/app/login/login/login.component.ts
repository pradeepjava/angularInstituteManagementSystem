import { Component, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { LoginserviceService } from 'src/app/service/loginservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  static userName: string = 'unknown';
  static role: string = 'unknown';
  static isLoggedIn: boolean = false;
  loginService: LoginserviceService;
  constructor(private router: Router, loginService: LoginserviceService) {
    this.loginService = loginService;

  }
  ngOnInit(): void {
  }

  authenticateUser(user: string, pass: string) {
    LoginComponent.isLoggedIn = this.loginService.authenticateUser(user, pass);
    if (LoginComponent.isLoggedIn) {
      let user = sessionStorage.getItem("name");
      if (user != null) {
        LoginComponent.userName = user;
      }
      let role = sessionStorage.getItem("role");
      if (role != null) {
        LoginComponent.role = role;
      }
      this.router.navigate(['loginSuccess'])
    }
  }
}


