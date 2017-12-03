import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

import {User} from '../../../_models/user.model';
import {UserService} from '../../../_services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: User = new User();
  message = {type: 'error', 'msg': 'Account not created. Please provide valid user data!'};

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  onRegister() {

    this.userService.register(this.user).subscribe(res => {
      console.log('An account has been created: ', res);
      this.router.navigate(['/user/login']);
    }, err => {

      console.log(err);
    });

  }
}
