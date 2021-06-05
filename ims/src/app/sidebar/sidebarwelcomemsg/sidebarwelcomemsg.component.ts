import { Component, OnInit } from '@angular/core';
import { LoginComponent } from 'src/app/login/login/login.component';
import { LoginserviceService } from 'src/app/service/loginservice.service';

@Component({
  selector: 'app-sidebarwelcomemsg',
  templateUrl: './sidebarwelcomemsg.component.html',
  styleUrls: ['./sidebarwelcomemsg.component.css']
})
export class SidebarwelcomemsgComponent implements OnInit {
 username:string='aa'
 role : string=''

  constructor() {

    
   }

  ngOnInit(): void {
    console.log("username")
    console.log(LoginComponent.userName)
    LoginComponent.userName
    
  }
  getUser()
  {
    LoginComponent.userName
  }
}
