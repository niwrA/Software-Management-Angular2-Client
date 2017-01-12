import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users/users.service';
import { Login } from './login';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login: Login;
  constructor(private usersservice: UsersService) {
    this.login = new Login;
    this.login.title = 'Enter username and password';
    this.login.name = '';
    this.login.password = '';
  }

  ngOnInit() {
  }

  doLogin() {
    this.usersservice.login(this.login.name, this.login.password);
  }
}
