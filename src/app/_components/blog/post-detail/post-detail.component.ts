import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Post } from '../../../_models/post.model';
import { PostService } from '../../../_services/post.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {
  post: Post = new Post();
  comments: Comment[] = [];
  postId: string = "";

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    protected postService: PostService) {

  }

  ngOnInit() {

    this.route.params.switchMap((params: Params) => {
      const id = params['id'];
      this.postId = id;

      let query = {
        include: ["comments"]
      };
      let filter = encodeURI(JSON.stringify(query));

      return this.postService.getPost(id, filter);
      // return this.postService.getPost(id);
    }).subscribe(response => {
      this.post = response as Post;
      this.comments = response.comments;
      console.log(response);
    }, err => {
      console.log(err);
    });
  }

  onNewComment(event){
      this.comments.push(event);
  }

}
