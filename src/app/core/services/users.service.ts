import { Injectable } from '@angular/core';
import {Users} from "../../shared/classes/users";
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  userList: Users[] =[];
  constructor() { }

  getUsersList(): Users[]{
    return this.userList;
  }
  getUser(name: string): Users{
    return this.userList.find( users => users.name === name );
  }
  addUser(name: string){
    const user = new Users(name);
    this.userList.push(user);
  }
  removeUser(name: string){
    let x = this.userList.find( users => users.name === name);
    let position = this.userList.indexOf(x);
    if (position > -1){
      this.userList.splice(position, 1);
      console.log(this.userList);
    }
  }
}
