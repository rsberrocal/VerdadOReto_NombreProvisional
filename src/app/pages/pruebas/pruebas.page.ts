import {Component, OnInit} from '@angular/core';
import {Users} from '../../shared/classes/users';
import {UsersService} from '../../core/services/users.service';
import {Pruebas} from '../../shared/classes/pruebas';
import {PruebasService} from '../../core/services/pruebas.service';
import {CurrentPruebaService} from '../../core/services/current-prueba.service';
import {Router} from '@angular/router';
import {AlertController, MenuController} from '@ionic/angular';
import {NgZone} from '@angular/core';

@Component({
    selector: 'app-pruebas',
    templateUrl: './pruebas.page.html',
    styleUrls: ['./pruebas.page.scss'],
})
export class PruebasPage implements OnInit {
    prueba: Pruebas;
    jugadorP: Users = new Users('');
    jugadoresS: Users[] = [];
    scoreP: number;
    ronda: number;
    pruebaType = ['success', 'RubenTonto'];
    newDescript: string;

    constructor(
        private router: Router,
        private userService: UsersService,
        private pruebasService: PruebasService,
        private currentPrueba: CurrentPruebaService,
        private alertController: AlertController,
        private zone: NgZone,
        private menu: MenuController) {

    }

    ngOnInit(): void {
    }

    ionViewWillEnter() {
        this.ronda = this.pruebasService.getRonda();
        this.scoreP = this.currentPrueba.getScore();
        this.jugadorP = this.currentPrueba.getCurrentUser();
        this.prueba = this.setPrueba();
        this.setSecondaryPlayers();
        this.pruebaType = this.pruebaTypeSetter();
    }

    getPruebasList(): Pruebas[] {
        return this.pruebasService.getPruebas();
    }

    getImg() {
        return this.prueba.image ? this.prueba.image : '/assets/img/default_img.png';
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
                return ['primary', 'Verdad'];

            case 2:
                return ['success', 'Reto Nivel UPC'];

            case 3:
                return ['warning', 'Reto Nivel Normal'];

            case 4:
                return ['danger', 'Reto Nivel UB'];

        }
    }

    setSecondaryPlayers() {
        this.jugadoresS = [];
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
        this.replaceDescription();
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
        let index = Math.floor(Math.random() * this.getUsers().length);
        return this.getUsers()[index];
    }

    replaceDescription() {
        let oldstr = this.prueba.description;
        for (let player of this.jugadoresS) {
            oldstr = oldstr.toString().replace('{user}', player.name);
        }
        this.newDescript = oldstr;
    }

    skip() {
        this.jugadorP.havePlayed = true;
    }

    play() {
        this.jugadorP.havePlayed = true;
        this.jugadorP.score += this.scoreP;
        for (let player of this.jugadoresS) {
            player.score += this.scoreP;
        }
    }

    setPlayersNotPlayed() {
        for (let i = 0; i < this.getUsers().length; i++) {
            this.userService.getUsersList()[i].havePlayed = false;
        }
    }

    navigate(routerLink) {
        if (this.userService.allUsersHavePlayed() && this.pruebasService.rondas == 10) {
            this.presentAlert2();
        } else if (this.userService.allUsersHavePlayed()) {
            this.presentAlert('/verdad-o-reto');

        } else {
            this.router.navigate([routerLink], {replaceUrl: true});
            //Aqui va el metodo para pasar a la siguiente ronda.
        }
    }

    async presentAlert(routerLink) {

        let orderedList = this.userService.getUsersList().sort(function (a, b) {
            return b.score - a.score;
        });
        let arrayPlayers = [];
        let aux;
        for (let index = 0; index < orderedList.length; index += orderedList.length / 3) {
            aux = orderedList.slice(index, index + (orderedList.length / 3));
            arrayPlayers.push(aux);
        }
        console.log('array players', arrayPlayers);
        let subHeaderText = '';
        let vasos = 0;
        for (let actualList of  arrayPlayers) {
            for (let players of actualList) {
                subHeaderText += '<p  style="margin: 0">'+players.name + ' ' + vasos * 0.5 + ' <span class="iconColor"><ion-icon name="beer"></ion-icon></span> </p>';
            }
            vasos++;
        }
        console.log('Subheader final', subHeaderText);

        const alert = await this.alertController.create({
            header: 'Toca beber chavales',
            message: subHeaderText,
            cssClass:'finalRound',
            buttons: [
                {
                    text: 'Ok',
                    handler: () => {
                        this.zone.run(async () => {
                            this.pruebasService.rondas += 1;
                            this.setPlayersNotPlayed();
                            this.router.navigate([routerLink]);
                        });
                    }
                }
            ]
        });

        await alert.present();
    }

    async presentAlert2() {
        const alert = await this.alertController.create({
            header: 'Fin de Partida!!',
            subHeader: 'A ver quien es el tonto que ha quedado último',
            buttons: [
                {
                    text: 'Ver Ranking',
                    handler: () => {
                        this.zone.run(async () => {
                            await this.router.navigate(['/users']);
                        });
                    }
                }]
        });

        await alert.present();
    }
}
