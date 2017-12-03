import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';

import { PostService } from './_services/post.service';
import { UserService } from './_services/user.service';
import { AuthService } from './_services/auth.service';

import { AppComponent } from './app.component';
import { BlogComponent } from './_components/blog/blog-main/blog.component';
import { HomeComponent } from './_components/home/home.component';
import { PostDetailComponent } from './_components/blog/post-detail/post-detail.component';
import { PostFormComponent } from './_components/blog/post-form/post-form.component';
import { LoginComponent } from './_components/user/login/login.component';
import { ProfileComponent } from './_components/user/profile/profile.component';
import { RegisterComponent } from './_components/user/register/register.component';
import { CategorySectionComponent } from './_components/blog/category-section/category-section.component';
import { CommentFormComponent } from './_components/blog/comment-form/comment-form.component';
import { PostAdminComponent } from './_components/blog/post-admin/post-admin.component';

const appRoutes = [
  { path: '', component: HomeComponent},
  { path: 'home', component: HomeComponent},
  { path: 'blog', component: BlogComponent},
  { path: 'blog/:id', component: PostDetailComponent},
  { path: 'blog-add', component: PostFormComponent},
  { path: 'blog/:id/edit', component: PostFormComponent},
  { path: 'user/login', component: LoginComponent},
  { path: 'user/register', component: RegisterComponent},
  { path: 'user/my-account', component: ProfileComponent},
  { path: 'category/:id', component: CategorySectionComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    BlogComponent,
    HomeComponent,
    PostDetailComponent,
    PostFormComponent,
    LoginComponent,
    ProfileComponent,
    RegisterComponent,
    CategorySectionComponent,
    CommentFormComponent,
    PostAdminComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [PostService, UserService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
