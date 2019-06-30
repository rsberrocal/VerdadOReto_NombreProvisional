import { Injectable } from '@angular/core';
import {Users} from "../../shared/classes/users";
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  richi = new Users("Richard")
  userList: Users[] =[this.richi];
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
  removeUser(position: number){
    if (position > -1){
      this.userList.splice(position, 1);
    }
  }
}
