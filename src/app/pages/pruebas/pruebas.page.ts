import { Component, OnInit } from '@angular/core';
import {Users} from "../../shared/classes/users";
import {UsersService} from "../../core/services/users.service";
import {Pruebas} from "../../shared/classes/pruebas";
import {PruebasService} from "../../core/services/pruebas.service";
import {CurrentPruebaService} from "../../core/services/current-prueba.service";

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
  ronda: number;
  constructor(private userService: UsersService, private pruebasService: PruebasService, private currentPrueba: CurrentPruebaService) {
    this.ronda = this.pruebasService.getRonda();
    this.scoreP = currentPrueba.getScore();
    console.log(this.scoreP)
    this.jugadorP = currentPrueba.getCurrentUser();
    this.prueba = this.setPrueba();
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
  setPrueba(): Pruebas{
    let x;
    while(true){
      x = Math.floor(Math.random() * this.getPruebasList().length);
      if (this.getPruebasList()[x].score==this.scoreP){
        return this.getPruebasList()[x];
        console.log("POLLA");

      }
    }

  }
  setCurrentPlayer(user: Users, x: number){

  }
}
