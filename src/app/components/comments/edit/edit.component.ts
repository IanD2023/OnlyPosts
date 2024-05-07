import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Comments } from '../../../Comments';
import { CommentsService } from '../../../services/comments.service';

@Component({
  selector: 'comment-edit',
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditCommentComponent implements OnInit {

  @Input() comment!: Comments;

  editComment!: FormGroup;
  commentValue: string = "";

  constructor(private commentsService: CommentsService){
  }

  ngOnInit(): void {
    
    this.editComment = new FormGroup({
      id: new FormControl(this.comment.id),
      body: new FormControl(this.comment.body,[Validators.required])
    })
    this.commentValue = this.comment.body;
      
  }

  submit(){
    
    if(this.editComment.invalid){
      return;
    }
    try{

      this.commentsService.edit(this.editComment.value);

      let formEdit = document.getElementById(String(this.comment.id));
      let content = document.getElementById(this.comment.id+this.commentValue);

      if(formEdit?.className == "mt-2 hidden"){
        formEdit?.setAttribute('class','mt-2');
        content?.setAttribute('class','mt-2 hidden');
      }else{
  
        formEdit?.setAttribute('class','mt-2 hidden');
        content?.setAttribute('class','mt-2');
  
      }

      this.commentValue = this.comment.body;

    }

    catch (error){
      console.log(error)
    }
  }

}
