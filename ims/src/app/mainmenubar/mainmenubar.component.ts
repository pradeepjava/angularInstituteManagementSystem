import { Component, OnInit } from '@angular/core';
import { LoginserviceService } from '../service/loginservice.service';

@Component({
  selector: 'app-mainmenubar',
  templateUrl: './mainmenubar.component.html',
  styleUrls: ['./mainmenubar.component.css']
})
export class MainmenubarComponent implements OnInit {
  loginService:LoginserviceService | undefined;
  constructor(loginService: LoginserviceService) { 
this.loginService=loginService;

  }

  ngOnInit(): void {
  }
  isSuccessLogin()
  {
    return this.loginService?.isLoggedIn();
  }
  clearSession()
  {
    sessionStorage.clear();
  }
}
