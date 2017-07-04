import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users/users.service';
import { Register } from './register';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  register: Register;
  constructor(private usersservice: UsersService, private router: Router, private activatedroute: ActivatedRoute) {
    this.register = new Register;
    this.register.title = 'Enter username and password';
    this.register.name = '';
    this.register.email = '';
    this.register.password = '';
  }

  ngOnInit() {
  }

  doRegister() {
    if (this.activatedroute.parent) {
      this.router.navigate([this.activatedroute.parent.routeConfig.path]);
    }
  }
}
