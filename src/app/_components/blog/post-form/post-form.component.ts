import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Post } from '../../../_models/post.model';
import { Category } from '../../../_models/category.model';
import { PostService } from '../../../_services/post.service';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {
  post: Post = new Post();

  message = {type: 'success', 'msg': 'Post successfully created.'};
  loading = false;
  defaultBodyValue = '';
  categories: Category[] = [];

  constructor(
    private postService: PostService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

    if (this.route.snapshot.params['id']) {
      this.route.params.switchMap((params: Params) => {
        const id = params['id'];
        if (typeof params['id'] !== 'undefined' && params['id'] !== null) {
          this.loading = true;
          return this.postService.getPost(id, null);
        }
      }).subscribe(res => {
        this.loading = false;
        this.post = res as Post;
        this.defaultBodyValue = this.post.body;
        console.log(this.post);
      }, err => {
        console.log(err);
      });
    }

    this.postService.getCategories().subscribe(res => {      
        this.categories = res;      
        }, err => {    
          console.log(err);      
    });
  }

  onSubmit() {
      console.log(this.post);

      if (this.post.id) {
        this.postService.updatePost(this.post).subscribe(res => {
          console.log(res.id);

          this.router.navigate(['/blog', res.id]);

        }, err => {
          console.log(err);
          this.message.type = 'error';
          this.message.msg = 'Error saving blog post';
        });
      } else {
        this.postService.createPost(this.post).subscribe(res => {
          console.log(res.id);

          this.router.navigate(['/blog', res.id]);

        }, err => {
          console.log(err);
          this.message.type = 'error';
          this.message.msg = 'Error saving blog post';
        });
      }
  }

  onBodyTextEditorKeyUp(textValue) {
      this.post.body = textValue;
  }

}
