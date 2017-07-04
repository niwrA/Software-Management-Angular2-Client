import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { User } from './user';
import { USERS } from './mock-users';
import { Register } from '../register/register';
import { environment } from '../../../environments/environment';
import { CommandsService } from '../../commands/commands.service';
import { NotificationsService } from 'angular2-notifications';

@Injectable()
export class UsersService {
  private current: User;
  users: Array<User>;
  constructor(private commandsService: CommandsService, private http: Http, private notificationService: NotificationsService) {
    this.users = USERS;
  }

  isLoggedIn(): boolean {
    if (this.current) {
      return true;
    }
    return false;
  }
  login(userName: string, password: string) {
    this.current = USERS[0];
  }
  register(register: Register){
    this.http.post(environment.accountsUrl, register )
  }
  logout() {
    this.current = undefined;
  }
  hasAccess(component: string, level: string): boolean {
    // todo: calculate access based on group access rights
    if (this.current !== null) {
      if (component === 'admin') {
        return this.current.isAdmin;
      } else {
        return true;
      }
    }
    return false;
  }
  isAdmin(): boolean {
    if(this.current && this.current.isAdmin) {
      return true;
    }
    return false;
  }
}
