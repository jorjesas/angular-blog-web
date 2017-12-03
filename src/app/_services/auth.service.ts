import {Injectable} from '@angular/core';
import {User} from '../_models/user.model';
import {isNullOrUndefined} from '../_helpers/util';
import {Observable, Subject} from 'rxjs/Rx';
import { UserService } from './user.service';

@Injectable()
export class AuthService {

  public onAuthChange$: Subject<User>;
  constructor() {
    this.onAuthChange$ = new Subject();
  }

  setUser(user: User) {
    this.onAuthChange$.next(user);

    const userString = JSON.stringify(user);
    localStorage.setItem('currentUser', userString);
  }

  getCurrentUser(): User {

    const userString = localStorage.getItem('currentUser');
    if (!isNullOrUndefined(userString)) {
      // console.log('getCurrentUser - ' + userString);
      return JSON.parse(userString) as User;
    } else {
      return null;
    }
  }

  setToken(token: string) {
    localStorage.setItem('accessToken', token);
  }

  getToken(): string {
    return localStorage.getItem('accessToken');
  }

  logout() {
    this.onAuthChange$.next(null);
    // we need also request logout to the server api

    //this.userService.logout();

    localStorage.removeItem('currentUser');
    localStorage.removeItem('accessToken');

  }

}
