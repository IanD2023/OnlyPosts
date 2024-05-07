import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Comments } from '../../../Comments';
import { CommentsService } from '../../../services/comments.service';
@Component({
  selector: 'comment-delete',
  templateUrl: './delete.component.html',
  styleUrl: './delete.component.css'
})
export class DeleteCommentComponent {

  @Input() comment!: Comments;

  showModal = false;
  saveComment!: Comments

  constructor(private commentService: CommentsService){
  
  }
  
  toggleModal(){
    this.showModal = !this.showModal;
  }

  deletar(){

    try{

    this.commentService.delete(this.comment.id!);
    this.toggleModal();
    document.getElementById('comment'+String(this.comment.id))?.setAttribute('class',"hidden");

    }catch(error){

      console.log(error);

    }

  }

}
