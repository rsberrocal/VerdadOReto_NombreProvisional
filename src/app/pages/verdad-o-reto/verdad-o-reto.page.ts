import { Component, OnInit } from '@angular/core';
import {UsersService} from "../../core/services/users.service";
import {Users} from "../../shared/classes/users";
import {CurrentPruebaService} from "../../core/services/current-prueba.service";
import {PruebasService} from "../../core/services/pruebas.service";

@Component({
  selector: 'app-verdad-o-reto',
  templateUrl: './verdad-o-reto.page.html',
  styleUrls: ['./verdad-o-reto.page.scss'],
})
export class VerdadORetoPage implements OnInit {

    user =  new Users(" ");
    isReto= false;
    ronda: number;
  constructor(private userService: UsersService, private currentPrueba: CurrentPruebaService, private pruebasService: PruebasService) {
      this.user = this.getRandomUser();
      this.ronda= this.pruebasService.getRonda();
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
              if (this.getUsers()[x].havePlayed == false){
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
  isRetoTrue(){
      this.isReto= true;
  }
  setCurrentInfo(x: number): void{
      this.currentPrueba.setCurrentInfo(this.user, x);
      console.log("Holi");
  }
}
