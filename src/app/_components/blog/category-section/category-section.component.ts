import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Post } from '../../../_models/post.model';
import { Category } from '../../../_models/category.model';
import { PostService } from '../../../_services/post.service';

@Component({
  selector: 'app-category-section',
  templateUrl: './category-section.component.html',
  styleUrls: ['./category-section.component.css']
})
export class CategorySectionComponent implements OnInit {
  posts: Post[] = [];
  category: Category = new Category();

  constructor(private route: ActivatedRoute, private postService: PostService) { }

  ngOnInit() {
    const categoryId = this.route.snapshot.params["id"];
    let query = {
      include: ["posts"]
    };

    let filter = encodeURI(JSON.stringify(query));
    
        this.postService.getCategoryById(categoryId, filter).subscribe(res => {  
          this.category  = res;  
          this.posts = res.posts;   
        });
  }

}
