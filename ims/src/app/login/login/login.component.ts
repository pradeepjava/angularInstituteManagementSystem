import { Component, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { LoginserviceService } from 'src/app/service/loginservice.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginserviceService]
})

export class LoginComponent implements OnInit {
  user: string = ''
  pass: string = ''
  // static isLoggedIn: boolean = false;
  loginService: LoginserviceService;

  constructor(private router: Router, loginService: LoginserviceService) {
    this.loginService = loginService;

  }
  ngOnInit(): void {
  }

  authenticateUser(user: string, pass: string) {

    if (user.length != 0 && pass.length != 0) {
      // LoginComponent.isLoggedIn = true;
      localStorage.setItem("name","pragya")
      localStorage.setItem("role","superviser")
      this.router.navigate(['loginSuccess'])
    }
    else {
      localStorage.clear();
    }
  }
}


