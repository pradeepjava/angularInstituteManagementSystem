import { Component, OnInit } from '@angular/core';
import { USERNAME, TOKEN, API_URL, USERROLE, USER_DISABLED, INVALID_CREDENTIALS } from 'src/app/constentProvider';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  sidebarDecider = ''

  constructor() { }

  ngOnInit(): void {
    this.decideSideBar()
  }
  decideSideBar() {
    let role = localStorage.getItem(USERROLE)
    if (role != null) {
      this.sidebarDecider= role;
    }
    return ''
  }
}
