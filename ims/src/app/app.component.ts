import { Component, Output } from '@angular/core';
import { LoginComponent } from './login/login/login.component';
import { CollapseComponent } from './mainmenubar/collapse/collapse.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  constructor() {

  }
  title = 'ims';
  isSuccessLogin() {
    return localStorage.length > 0
  }

}
