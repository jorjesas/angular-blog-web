import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { User } from '../_models/user.model';
import { isNullOrUndefined } from 'util';
import {Observable, Subject} from 'rxjs/Rx';
import { AuthService } from './auth.service';

@Injectable()
export class UserService {

    headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization': this.authService.getToken()
    });

    // serverUrl = 'http://localhost:3000/api';
    serverUrl = 'https://jorje-blog-api.herokuapp.com/api';

    constructor(private http: Http,
        private authService: AuthService) {
    }

    getUserById(id: string): Observable<User> {
        const url = this.serverUrl + '/accounts/' + id;
        return this.http.get(url, {headers: this.headers}).map(res => res.json()).catch(err => {
          return Observable.throw(err);
        });
    }

    login(username: string, password: string): Observable<any> {

        const url = this.serverUrl + '/accounts/login?include=user';
        return this.http.post(url, {username: username, password: password}, {headers: this.headers}).map(res => res.json()).catch(err => {
            return Observable.throw(err);
        });
    }

    register(user: User): Observable<any> {
        const url = this.serverUrl + '/accounts';
        this.headers.delete('Authorization');
        return this.http.post(url, user, {headers: this.headers}).map(res => res.json()).catch(err => {
          return Observable.throw(err);
        });
    }

    logout(): Observable<any> {

        const url = this.serverUrl + '/accounts/logout';
        // const data = {accessTokenID: this.authService.getToken()};
        return this.http.post(url, {headers: this.headers}).map(res => res.json()).catch(err => {
            return Observable.throw(err);
        });
    }
}

// export const userServiceInjectables: Array<any> = [UserService];
