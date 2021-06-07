import { Component, OnInit } from '@angular/core';
import { USERNAME, TOKEN, API_URL, USERROLE, USER_DISABLED, INVALID_CREDENTIALS } from 'src/app/constentProvider';
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
    let l = localStorage.getItem(USERNAME);
    if (l != null) {
      return l
    }
    return ''
  }
  assignedrole(): string {
    let l = localStorage.getItem(USERROLE);
    if (l != null) {
      return l
    }
    return ''
  }
}
