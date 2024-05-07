import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Posts } from '../Posts'; 
import { StorageService } from './storage.service';
import { UsersService } from './users.service';
import { Users } from '../Users';
import { CommentsService } from './comments.service';

@Injectable({
  providedIn: 'root'
})
export class PostsService{

  readonly apiURL:string;
  private listPosts: Posts[];
  private listUsers: Users[];

  constructor(private http: HttpClient, private storage: StorageService, private commentService: CommentsService) {

    this.apiURL = 'https://jsonplaceholder.typicode.com/posts';
    this.listPosts = this.storage.getData('listPosts') || [];
    this.listUsers = this.storage.getData("listUsers") || [];

  }

 async getAll() {

    return this.http.get<Posts[]>(`${ this.apiURL }`).subscribe(
      {
      next: async (resultado) =>  {

        if(this.listPosts.length == 0){
    
        this.storage.setData(
        'listPosts',resultado.sort(
        (a, b) => 
        (a.id! > b.id!) ? -1 : 1)
        );

        return;

       }

      this.saveList();
        
      }
      ,
      error: (erro) => {
        if(erro.status == 400) {
          console.log(erro);
        }
      }
    }

      );
    
            
  }

  saveList() {

    for (var  x = 0; x < this.listPosts.length ; x++){

      this.listPosts[x].userName = this.getNameUser(Number(this.listPosts[x].userId));

     }

    this.storage.setData('listPosts', this.listPosts.sort(
      (a, b) => 
      (a.id! > b.id!) ? -1 : 1));
    
  }

  create(post: Posts) {

    this.listPosts.push(post);
    this.saveList();
  }

  edit(post: Posts){

    let Post = this.listPosts.find(function (posts){ return posts.id == post.id});
    if(Post){
      Post.title = post.title;
      Post.body = post.body;
    }

    this.saveList();
  }

  delete(id: number){

    let Post = this.listPosts.find(function (posts){ return posts.id == id});

    var index = this.listPosts.indexOf(Post!);

    if (index > -1) {
      this.listPosts.splice(index, 1);
    }

    let listCommentsByPost = this.commentService.getCommentByPost(id);

    for (let x in listCommentsByPost){

     this.commentService.delete(listCommentsByPost[x].id!)
    }

    this.saveList();

  }

  getNameUser(userId: number): any{

    let getUser = this.listUsers.find(function (users){
      return users.id == userId
    });

    return getUser?.name

  }

}
