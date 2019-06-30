import { Component, OnInit } from '@angular/core';
import {UsersService} from "../../core/services/users.service";
import {Users} from "../../shared/classes/users";

@Component({
  selector: 'app-verdad-o-reto',
  templateUrl: './verdad-o-reto.page.html',
  styleUrls: ['./verdad-o-reto.page.scss'],
})
export class VerdadORetoPage implements OnInit {
user: Users;
  constructor(private userService: UsersService) {
      this.user = this.getRandomUser();
  }

  ngOnInit() {

  }
  getUsers(): Users[]{
      return this.userService.getUsersList();
  }
  getRandomUser(): Users {
      if (!this.allUsersHavePlayed()){
          let freeUser = false;
          while (freeUser == false) {
              let x = Math.floor(Math.random() * this.getUsers().length);
              if (this.getUsers()[x].havePlayed == false) {
                  return this.getUsers()[x];
              }
          }
      }
      //Aqui va el metodo para pasar a la siguiente ronda.
  }

  allUsersHavePlayed(): boolean{
      for(let i =0; i<this.getUsers().length; i++){
          if (this.getUsers()[i].havePlayed==false){
              return false;
          }
      }
      return true;
  }
}
