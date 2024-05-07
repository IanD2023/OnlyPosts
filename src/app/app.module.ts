import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostsComponent } from './components/posts/posts.component';
import { StorageService } from './services/storage.service';
import { EditComponent } from './components/posts/edit/edit.component';
import { DeleteComponent } from './components/posts/delete/delete.component';
import { UsersComponent } from './components/users/users.component';
import { CommentsComponent } from './components/comments/comments.component';
import { DeleteCommentComponent } from './components/comments/delete/delete.component';
import { EditCommentComponent } from './components/comments/edit/edit.component';

@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    EditComponent,
    DeleteComponent,
    UsersComponent,
    CommentsComponent,
    DeleteCommentComponent,
    EditCommentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    provideClientHydration(),
    StorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
