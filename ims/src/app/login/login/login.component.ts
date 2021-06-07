import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginserviceService } from 'src/app/service/loginservice.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

export class LoginComponent implements OnInit {
  user: string = ''
  pass: string = ''
  invaidLogin: boolean = false;


  constructor(private router: Router, private loginService: LoginserviceService) {


  }
  ngOnInit(): void {
  }

  authenticateUser() {
    if (this.user.length != 0 && this.pass.length != 0) {
      this.loginService.executeJWTAuthenticationService(this.user, this.pass).subscribe(
        data => {
          console.log(data);
          localStorage.setItem("name", "pragya")
          localStorage.setItem("role", "superviser")
          this.invaidLogin = false;
          this.router.navigate(['loginSuccess'])

        },
        error => {
          console.log(error)
          this.invaidLogin = true;
          localStorage.clear();
          this.router.navigate(['error'])
        }

      );

    }

  }
}


