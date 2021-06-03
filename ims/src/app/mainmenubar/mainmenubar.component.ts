import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../login/login/login.component';

@Component({
  selector: 'app-mainmenubar',
  templateUrl: './mainmenubar.component.html',
  styleUrls: ['./mainmenubar.component.css']
})
export class MainmenubarComponent implements OnInit {

  constructor(private loginComponent: LoginComponent) { }

  ngOnInit(): void {
  }
  isSuccessLogin()
  {
    return this.loginComponent.isLoggedIn;
  }
}
