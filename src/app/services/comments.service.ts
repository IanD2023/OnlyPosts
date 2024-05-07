import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { Comments } from '../Comments';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  readonly apiURL:string;

  readonly listComments: Comments[];

  constructor(private http: HttpClient, private storage: StorageService) {

    this.apiURL = 'https://jsonplaceholder.typicode.com/comments';  
    this.listComments = this.storage.getData('listComments') || [];
  }

  saveList() {

    this.storage.setData('listComments', this.listComments.sort(
      (a, b) => 
      (a.id! > b.id!) ? -1 : 1)
    );
    
  }

  async getAll() {

    return this.http.get<Comments[]>(`${ this.apiURL }`).subscribe(
      {
      next: async (resultado) =>  {

        if(this.listComments.length == 0){
    
        this.storage.setData(
        'listComments',resultado.sort(
          (a, b) => 
          (a.id! > b.id!) ? -1 : 1)
        );

       }
        
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

  getCommentByPost(postId: number){

    return this.listComments.filter((comments) => 
      String(comments.postId).includes(String(postId))
    )

  }

  create(comment: Comments){

    this.listComments.push(comment);

    this.saveList();
      
  }


  getID(){

    return this.listComments[0].id! + 1;

  }

  getCommentById(id: string){

    return this.listComments.filter((comments) => 
      String(comments.id).includes(id)
    )

  }

  edit(comment: Comments){
    
    let Comment = this.listComments.find(function (x){ return x.id == comment.id});

    if(Comment){
      Comment.body = comment.body;
    }
    this.saveList();
  }

  delete(id: number){

    let Post = this.listComments.find(function (comment){ return comment.id == id});

    var index = this.listComments.indexOf(Post!);

    if (index > -1) {
      this.listComments.splice(index, 1);
    }

    this.saveList();

  }


}
