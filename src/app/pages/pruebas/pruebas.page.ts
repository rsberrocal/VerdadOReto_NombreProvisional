import { Component, OnInit } from '@angular/core';
import {Users} from "../../shared/classes/users";
import {UsersService} from "../../core/services/users.service";
import {Pruebas} from "../../shared/classes/pruebas";
import {PruebasService} from "../../core/services/pruebas.service";

@Component({
  selector: 'app-pruebas',
  templateUrl: './pruebas.page.html',
  styleUrls: ['./pruebas.page.scss'],
})
export class PruebasPage implements OnInit {
  prueba: Pruebas;
  jugadorP: Users;
  jugadoresS: Users[];
  scoreP: number;
  constructor(private userService: UsersService, private pruebasService: PruebasService) {
    this.setPrueba();
    console.log("Amos a ver")

  }

  ngOnInit() {
  }
  getUsersList(): Users[]{
    return this.userService.getUsersList();
  }
  getPruebasList(): Pruebas[]{
    return this.pruebasService.getPruebas();
  }
  setPrueba(){
    let finded= false;
    let x;
    while(finded==false){
      x = Math.floor(Math.random() * this.getPruebasList().length);
      if (this.getPruebasList()[x].score==this.scoreP){
        this.prueba = this.getPruebasList()[x];
      }
    }

  }
  setCurrentPlayer(user: Users, x: number){

  }
}
