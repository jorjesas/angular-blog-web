import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Post } from '../../../_models/post.model';
import { PostService } from '../../../_services/post.service';
import { AuthService } from '../../../_services/auth.service';

@Component({
  selector: 'app-post-admin',
  templateUrl: './post-admin.component.html',
  styleUrls: ['./post-admin.component.css']
})
export class PostAdminComponent implements OnInit {
  @Input() post: Post; 
  @Output() notify: EventEmitter<Post> = new EventEmitter<Post>();

  constructor(private router: Router,
              protected postService: PostService,
              protected authService: AuthService) { }

  ngOnInit() {
  }

  isPostCreatedByLoggedUser() {
    
    let user = this.authService.getCurrentUser();
    console.log(user);
    if (user != null) {
      return user.id === this.post.accountId;
    }

    return false;
  }

  onDelete(){
    var retVal = confirm("Do you want to delete the current post ?");
    if (retVal) {
      this.postService.deletePost(this.post).subscribe(res => {
        this.router.navigate(['/blog']);
        this.notify.emit(this.post);
      }, err => {
        console.log(err);
      });
    }
  }

}
