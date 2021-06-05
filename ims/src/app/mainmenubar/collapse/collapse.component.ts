import { Component, OnInit } from '@angular/core';
import { LoginComponent } from 'src/app/login/login/login.component';
import { LoginserviceService } from 'src/app/service/loginservice.service';



@Component({
  selector: 'app-collapse',
  templateUrl: './collapse.component.html',
  styleUrls: ['./collapse.component.css']
})
export class CollapseComponent implements OnInit {
  static isSidebar: boolean = true;
  loginService:LoginserviceService | undefined;
  constructor( loginService:LoginserviceService) {

    this.loginService=loginService;
   }
  ngOnInit(): void {
  }
  islogged() {
    return LoginComponent.isLoggedIn;
  }
}
