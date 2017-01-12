import { NgModule, Component, OnInit } from '@angular/core';
import { UsersService } from './admin/users/users.service';
  
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UsersService]
})
export class AppComponent {
  title = 'Software Management';

  constructor(private usersservice: UsersService) { }

  isLoggedIn(): boolean {
    return this.usersservice.isLoggedIn();
  }
  isAdmin(): boolean {
    return this.usersservice.isAdmin();
  }

  logout() {
    this.usersservice.logout();
  }

}
