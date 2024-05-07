import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Comments } from '../../Comments';
import { CommentsService } from '../../services/comments.service';
import { StorageService } from '../../services/storage.service';
import { Posts } from '../../Posts';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Users } from '../../Users';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css'
})
export class CommentsComponent  implements OnInit{

  @Input() post!: Posts;
  @Input() user!: Users;
  listComments!: Comments[];
  createComment!: FormGroup;
  editComment!: FormGroup;
  auth: Users;
  
  showModal = false;
  ShowEditForm = false;

  constructor(private commentsService:CommentsService, private storage: StorageService){ 
    this.auth = this.storage.getData('auth');
  }

  ngOnInit(): void  {
    
    this.listComments = this.commentsService.getCommentByPost(this.post.id!);
    
    this.createComment = new FormGroup({
      postId: new FormControl(this.post.id),
      name: new FormControl('',),
      email: new FormControl(this.auth.email,),
      body: new FormControl('',[Validators.required])
    })

  }

  get body(){
    return this.createComment.get('body')!;
  }

  toggleModal(){
    this.showModal = !this.showModal;
  }

  editForm(id: any,comment: any){

    var formEdit = document.getElementById(id);
    var content = document.getElementById(comment);

    if(formEdit?.className == "mt-2 hidden"){
      formEdit?.setAttribute('class','mt-2');
      content?.setAttribute('class','mt-2 hidden');
    }else{

      formEdit?.setAttribute('class','mt-2 hidden');
      content?.setAttribute('class','mt-2');

    }
  }

  submit(){
    
    if(this.createComment.invalid){
      return;
    }
    try{

    this.createComment.value.id = this.commentsService.getID();

      this.commentsService.create(this.createComment.value);

      this.createComment.setValue(
        {
          postId: this.post.id,
          name: '',
          email: this.auth.email,
          body: ''
        }
      );
      this.listComments = this.commentsService.getCommentByPost(this.post.id!);

      // window.location.reload();


    }

    catch (error){
      console.log(error)
    }
  }

}
