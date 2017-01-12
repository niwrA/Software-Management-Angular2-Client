import { Injectable } from '@angular/core';
import { User } from './user';
import { USERS } from './mock-users';
@Injectable()
export class UsersService {
  private current: User;
  users: Array<User>;
  constructor() {
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
  logout() {
    this.current = undefined;
  }
  hasAccess(component: string, level: string): boolean {
    // todo: calculate access based on group access rights
    if (this.current !== null) {
      if (component === 'admin') {
        return this.current.IsAdmin;
      } else {
        return true;
      }
    }
    return false;
  }
  isAdmin(): boolean {
    if(this.current && this.current.IsAdmin) {
      return true;
    }
    return false;
  }
}
