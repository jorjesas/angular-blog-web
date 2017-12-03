import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../../../_models/user.model';
import { UserService } from '../../../_services/user.service';
import { AuthService } from '../../../_services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User = new User();
  message = {type: 'success', 'msg': ''};

  constructor(private userService: UserService,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
  }

  onLogin() {
    console.log('log in...', this.user);

    const user = this.user;
    this.userService.login(user.username, user.password).subscribe(res => {
      console.log(res);
      this.message.type = 'success';

      const userLoggedIn = res.user;
      this.authService.setUser(userLoggedIn);

      const token = res.id;
      this.authService.setToken(token);

      this.router.navigate(['/user/my-account']);
    }, err => {
      console.log(err);
      this.message.type = 'error';
      this.message.msg = 'Invalid credentials';
    });

  }

}
