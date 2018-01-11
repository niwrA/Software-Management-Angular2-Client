import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { User } from './user';
import { USERS } from './mock-users';
import { Register } from '../register/register';
import { environment } from '../../../environments/environment';
import { NotificationsService } from 'angular2-notifications';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class UsersService {
  private _nouserstring: 'not logged in';
  private current: User;
  get currentUserName() { return this.getUserName() };
  private _usernameSource = new BehaviorSubject<string>(this._nouserstring);
  // Observable navItem stream
  username$ = this._usernameSource.asObservable();
  users: Array<User>;
  constructor(private http: Http, private notificationService: NotificationsService) {
    this.users = USERS;
    this.current = USERS[0]; // get a default user for testing
  }

  isLoggedIn(): boolean {
    if (this.current) {
      return true;
    }
    return false;
  }
  login(userName: string, password: string) {
    this.current = USERS[0];
    this.current.name = userName;
    this.getUserName();
  }
  register(register: Register) {
    this.http.post(environment.accountsUrl, register)
  }
  logout() {
    this.current = undefined;
    this.getUserName();
  }
  private getUserName(): string {
    if (this.isLoggedIn()) {
      this._usernameSource.next(this.current.name);
      return this.current.name;
    }
    this._usernameSource.next(this._nouserstring);
    return 'please login';
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
    if (this.current && this.current.isAdmin) {
      return true;
    }
    return false;
  }
}
