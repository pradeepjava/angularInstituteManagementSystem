import { Component, Output } from '@angular/core';
import { LoginComponent } from './login/login/login.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

 constructor()
 {

 }
  title = 'ims';
  isSuccessLogin()
  {
    return LoginComponent.isLoggedIn;
  }
}
