import { Component, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  @Output() isLoggedIn: boolean=true;
  constructor() { }

  ngOnInit(): void {
  }


}
