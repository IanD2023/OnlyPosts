import { Component,Input, OnInit } from '@angular/core';
import { Posts } from '../../../Posts';
import { PostsService } from '../../../services/posts.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent implements OnInit {

  @Input() post!: Posts;

  editPostForm!: FormGroup

  showModal = false;

  constructor(private postsService: PostsService){}

  toggleModal(){
    this.showModal = !this.showModal;
  }

  ngOnInit(): void {

      this.editPostForm = new FormGroup({
        id: new FormControl(this.post.id),
        title: new FormControl(this.post.title,[Validators.required]),
        body: new FormControl(this.post.body,[Validators.required])
      })

  }


  get title(){
    return this.editPostForm.get('title')!;
  }

  get body(){
    return this.editPostForm.get('body')!;
  }

  editPost(){
    this.postsService.edit(this.post);
  }

  submit(){

    if (this.editPostForm.invalid){
      return;
    }

    try{

    this.postsService.edit(this.editPostForm.value);
    window.location.reload()
    
    }catch(error){
      console.log(error)
    }
  }
  

}
