import {Component, OnInit} from '@angular/core';
import {UsersService} from '../../core/services/users.service';
import {Users} from '../../shared/classes/users';
import {CurrentPruebaService} from '../../core/services/current-prueba.service';
import {PruebasService} from '../../core/services/pruebas.service';
import {MenuController} from '@ionic/angular';
import {Router} from '@angular/router';

@Component({
    selector: 'app-verdad-o-reto',
    templateUrl: './verdad-o-reto.page.html',
    styleUrls: ['./verdad-o-reto.page.scss'],
})
export class VerdadORetoPage implements OnInit {

    user = new Users(' ');
    isReto = false;
    ronda: number;

    constructor(
        private userService: UsersService,
        private currentPrueba: CurrentPruebaService,
        private pruebasService: PruebasService,
        private menu: MenuController,
        private router: Router) {
        this.user = this.getRandomUser();
        this.ronda = this.pruebasService.getRonda();
    }

    ngOnInit() {

    }

    openRanking() {
        //Example Promise return
        this.menu.enable(true, 'ranking')
            .then(() => this.menu.open('ranking'));

    }

    getUsers(): Users[] {
        return this.userService.getUsersList();
    }

    getRandomUser(): Users {
        //Si no hay algun usuario que aun no ha jugado entra
        if (!this.userService.allUsersHavePlayed()) {
            let usersNotPlayed = this.getUsers().filter(function(user) {
                return user.havePlayed == false;
            });
            let index = Math.floor(Math.random() * usersNotPlayed.length);
            return usersNotPlayed[index];
        }
        //Aqui va el metodo para pasar a la siguiente ronda.
    }

    isRetoTrue() {
        this.isReto = true;
    }

    setCurrentInfo(x: number): void {
        this.currentPrueba.setCurrentInfo(this.user, x);
    }

    navigate(routerLink) {
        this.router.navigate([routerLink], {replaceUrl: true});
        //Aqui va el metodo para pasar a la siguiente ronda.
    }

}
