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
  invaidLogin: boolean = false;
  loginService: LoginserviceService;

  constructor(private router: Router, loginService: LoginserviceService) {
    this.loginService = loginService;

  }
  ngOnInit(): void {
  }

  authenticateUser(user:string,pass:string) {
    if (user.length != 0 && pass.length != 0) {
      console.log('entered user')
      console.log(this.user)
      localStorage.setItem("name","pragya")
      localStorage.setItem("role","superviser")
     this.invaidLogin=false;
      this.router.navigate(['loginSuccess'])
    }
    else {
      localStorage.clear();
      this.invaidLogin=true;
    }
  }
}


