import { Component, OnInit } from '@angular/core';
import { LoginComponent } from 'src/app/login/login/login.component';
import { LoginserviceService } from 'src/app/service/loginservice.service';

@Component({
  selector: 'app-sidebarwelcomemsg',
  templateUrl: './sidebarwelcomemsg.component.html',
  styleUrls: ['./sidebarwelcomemsg.component.css']
})
export class SidebarwelcomemsgComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }
  assignuser(): string {
    let l = localStorage.getItem("name");
    if (l != null) {
      return l
    }
    return ''
  }
  assignedrole(): string {
    let l = localStorage.getItem("role");
    if (l != null) {
      return l
    }
    return ''
  }
}
