import { Injectable } from '@angular/core';
import { Users } from '../Users';
import { HttpClient } from '@angular/common/http';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  readonly apiURL:string;
  private listUsers: Users[];

  constructor(private http: HttpClient, private storage: StorageService) {

    this.apiURL = 'https://jsonplaceholder.typicode.com/users/';

    this.listUsers = this.storage.getData('listUsers') || [];

  }

  async getAll() {

    return this.http.get<Users[]>(`${ this.apiURL }`).subscribe(
      {
      next: (resultado) =>  {

        if(this.listUsers.length == 0){
          for (var  x = 0; x < resultado.length ; x++){

            resultado[x].password = "onlyposts#23";
      
           } 
        
        this.storage.setData(
        'listUsers',resultado.sort(
        (a, b) => 
        (a.id! > b.id!) ? -1 : 1)
        );

       }
        
        this.storage.getData('listUsers');
        
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

  login(username: string,password:string){


    let Login = this.listUsers.find(function (user){ return user.username == username && user.password == password});
    
    if (!Login){
      return false;
    }

    this.storage.setData(
      'auth',Login
      );

    return Login

  }
}
