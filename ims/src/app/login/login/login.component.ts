import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginserviceService } from 'src/app/service/loginservice.service';
import { USERNAME, TOKEN, API_URL, USERROLE, USER_DISABLED, INVALID_CREDENTIALS } from 'src/app/constentProvider';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

export class LoginComponent implements OnInit {
  user: string = ''
  pass: string = ''
  invalidLogin: boolean = false;
  userDisabled: boolean = false;
  constructor(private router: Router, private loginService: LoginserviceService) {

  }
  ngOnInit(): void {
  }

  authenticateUser() {
    if (this.user.length != 0 && this.pass.length != 0) {
      this.loginService.executeJWTAuthenticationService(this.user, this.pass).subscribe(
        data => {
          if (localStorage.getItem(USER_DISABLED) != null) {
            this.userDisabled = true;
            this.invalidLogin = false;
            localStorage.clear();
          }
          else if (localStorage.getItem(INVALID_CREDENTIALS) !=null) {
            this.invalidLogin = true;
            this.userDisabled = false;
            localStorage.clear();
          }
          else {
            this.invalidLogin = false;
            this.userDisabled = false;
            this.router.navigate(['loginSuccess'])
          }
        },
        error => {
          console.log(error)
          this.invalidLogin = true;
          this.router.navigate(['error'])
        }
      );
    }
    else{
      this.invalidLogin = true;
      localStorage.clear();
    }
  }
}


