import {Component, OnInit} from '@angular/core';
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
    jugadoresS: Users[] = [];
    scoreP: number;
    ronda: number;
    pruebaType = ["success", "RubenTonto"];
    newDescript: string;

    constructor(private userService: UsersService, private pruebasService: PruebasService, private currentPrueba: CurrentPruebaService) {
        this.ronda = this.pruebasService.getRonda();
        this.scoreP = currentPrueba.getScore();
        this.jugadorP = currentPrueba.getCurrentUser();
        this.prueba = this.setPrueba();
        this.setSecondaryPlayers();
        this.replaceDescription();
        this.pruebaType = this.pruebaTypeSetter();

    }

    ngOnInit() {
    }

    getPruebasList(): Pruebas[] {
        return this.pruebasService.getPruebas();
    }

    setPrueba(): Pruebas {
        let x;
        while (true) {
            x = Math.floor(Math.random() * this.getPruebasList().length);


            if (this.getPruebasList()[x].score == this.scoreP) {
                return this.getPruebasList()[x];

            }
        }

    }

    pruebaTypeSetter(): string[] {
        switch (this.scoreP) {
            case 1:
                return ["primary", "Verdad"];

            case 2:
                return ["success", "Reto Nivel UPC"];

            case 3:
                return ["warning", "Reto Nivel Medium"];

            case 4:
                return ["danger", "Reto Nivel UB"]

        }
    }

    setSecondaryPlayers() {
        let x = this.prueba.numPlayers - 1;
        let bol;
        for (let i = 0; i < x; i++) {
            bol = false;
            while (!bol) {
                let jug = this.getRandomUser();
                if (!this.jugadoresS.includes(jug) && (jug != this.jugadorP)) {
                    this.jugadoresS.push(jug);
                    bol = true;
                }
            }
        }
    }

    getUsers(): Users[] {
        return this.userService.getUsersList();
    }

    getRandomUser(): Users {
        let freeUser = false;
        while (freeUser == false) {
            let x = Math.floor(Math.random() * this.getUsers().length);
            if (this.getUsers()[x].havePlayed == false) {
                return this.getUsers()[x];
            }
        }
    }

    replaceDescription(){
        let oldstr= this.prueba.description
        for(let i= 0; i < this.prueba.numPlayers-1;i++) {
            oldstr = oldstr.toString().replace("{user}", this.jugadoresS[i].name);
        }
        this.newDescript= oldstr;
    }
    //Aqui va el metodo para pasar a la siguiente ronda.
}
