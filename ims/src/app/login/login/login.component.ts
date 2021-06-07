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
  invaidLogin: boolean = false;
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
            localStorage.clear();
          }
          else if (localStorage.getItem(INVALID_CREDENTIALS) !=null) {
            this.invaidLogin = true;
            localStorage.clear();
          }
          else {
            this.invaidLogin = false;
            this.userDisabled = false;
            this.router.navigate(['loginSuccess'])
          }
        }
        // error => {
        //   console.log(error)
        //   this.invaidLogin = true;
        //   this.router.navigate(['error'])
        // }
      );
    }
    else{
      this.invaidLogin = true;
      localStorage.clear();
    }
  }
}


