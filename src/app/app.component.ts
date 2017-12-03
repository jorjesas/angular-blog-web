import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Subject} from 'rxjs';

import { isNullOrUndefined } from './_helpers/util';
import { User } from './_models/user.model';
import { PostService } from './_services/post.service';
import { UserService } from './_services/user.service';
import { AuthService } from './_services/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  user: User = new User();
  isLoggedIn = false;

  constructor(private postService: PostService,
              private userService: UserService,
              private authService: AuthService,
              private router: Router) {
    this.user = this.authService.getCurrentUser();

    if (!isNullOrUndefined(this.user) && this.user.id) {
      this.isLoggedIn = true;
    }
  }

  ngOnInit() {
    this.authService.onAuthChange$.subscribe(user => {
      if (user) {
        this.isLoggedIn = true;
        this.user = user;
      } else {
        this.isLoggedIn = false;
      }
    });
  }

  logout() {
    this.isLoggedIn = false;
    this.user = null;
    this.userService.logout();
    this.authService.logout();

    this.router.navigate(['/home']);
  }
}
