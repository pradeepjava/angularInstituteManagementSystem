import { Component, Output } from '@angular/core';
import { LoginComponent } from './login/login/login.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

 constructor(private loginComponent:LoginComponent)
 {

 }
  title = 'ims';
  isSuccessLogin()
  {
    return this.loginComponent.isLoggedIn;
  }
}
