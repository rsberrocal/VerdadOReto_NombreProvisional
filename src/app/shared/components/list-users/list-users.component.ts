import { Component, OnInit } from '@angular/core';
import {Users} from "../../classes/users";
import {UsersService} from "../../../core/services/users.service";

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss'],
})
export class ListUsersComponent implements OnInit {
  users: Users[]
  constructor(private usersService: UsersService) {
    this.users= this.usersService.getUsersList();
  }

  ngOnInit() {}

  getUsers(): Users[]{
    return this.users;
  }
  removeUser(name: string){
    this.usersService.removeUser(name);
  }
}
