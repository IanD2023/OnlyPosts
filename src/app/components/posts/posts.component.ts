import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { Posts } from '../../Posts';
import { StorageService } from '../../services/storage.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { CommentsService } from '../../services/comments.service';
import { Users } from '../../Users';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css'
})
export class PostsComponent implements OnInit {

  listPosts: Posts[] = [];

  createPostForm!: FormGroup;

  auth!: Users | boolean;

  authenticated!: Users;

  constructor(private PostsServices: PostsService, private storage: StorageService,
    private usersService: UsersService, private commentService: CommentsService) {
    this.listPosts = this.storage.getData('listPosts') || [];
    this.usersService.getAll();
    this.commentService.getAll();
    this.PostsServices.getAll();
    this.auth =  this.usersService.login('Bret','onlyposts#23'); 
  }

  ngOnInit(): void {

    if(this.auth){

      this.authenticated = this.storage.getData('auth');
    }

    this.createPostForm = new FormGroup({
      userId:new FormControl(1,),
      title: new FormControl('',[Validators.required]),
      body: new FormControl('',[Validators.required])
    })
    
  }

  toggleDiv(){
    document.getElementById('header')?.setAttribute('class','fixed flex flex-col w-full justify-start items-center shadow-lg bg-white h-full');
    document.getElementById('newpost')?.setAttribute('class','justify-center flex mt-40');
  }

  fechaDiv(){
    document.getElementById('header')?.setAttribute('class','fixed flex flex-col w-full justify-start items-center shadow-lg bg-white');
    document.getElementById('newpost')?.setAttribute('class','hidden justify-center flex mt-40');

    this.createPostForm.setValue({
      userId: 1,
     title: '',
     body: ''
    })
  }


  get title(){
    return this.createPostForm.get('title')!;
  }

  get body(){
    return this.createPostForm.get('body')!;
  }

  submit(){

    if(this.createPostForm.invalid){
      return;
    }

    this.createPostForm.value.id = Number(this.listPosts[0].id) + 1;

    try{

      this.PostsServices.create(this.createPostForm.value);
      window.location.reload();
    }
    catch (error){
      console.log(error)
    }
  }
}
