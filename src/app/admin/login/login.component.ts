import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';
import { UsersService } from '../users/users.service';
import { Login } from './login';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login: Login;
  constructor(private usersservice: UsersService, private accountservice: AccountService,
  private router: Router, private activatedroute: ActivatedRoute) {
    this.login = new Login;
    this.login.title = 'Enter username and password';
    this.login.name = '';
    this.login.password = '';
  }

  ngOnInit() {
  }

  doLogin() {
    this.accountservice.signin(this.login.name, this.login.password);
    this.usersservice.login(this.login.name, this.login.password);
    if (this.activatedroute.parent && this.activatedroute.parent.routeConfig) {
      this.router.navigate([this.activatedroute.parent.routeConfig.path]);
    }
  }
}
