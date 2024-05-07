import { Component, Input } from '@angular/core';
import { Posts } from '../../../Posts';
import { PostsService } from '../../../services/posts.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrl: './delete.component.css'
})
export class DeleteComponent {

  @Input() post!: Posts;

  showModal = false;

  constructor(private postService: PostsService){}

  toggleModal(){
    this.showModal = !this.showModal;
  }

  delete(){

    try{

    this.postService.delete(this.post.id!);
    window.location.reload()
    }catch(error){

      console.log(error);
    }
    // console.log(this.post.id);

  }


}
