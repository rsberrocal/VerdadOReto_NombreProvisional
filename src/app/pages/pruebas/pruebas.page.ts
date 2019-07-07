import {Component, OnInit} from '@angular/core';
import {Users} from '../../shared/classes/users';
import {UsersService} from '../../core/services/users.service';
import {Pruebas} from '../../shared/classes/pruebas';
import {PruebasService} from '../../core/services/pruebas.service';
import {CurrentPruebaService} from '../../core/services/current-prueba.service';
import {Router} from '@angular/router';
import {AlertController, MenuController} from '@ionic/angular';


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
    pruebaType = ['success', 'RubenTonto'];
    newDescript: string;

    constructor(
        private router: Router,
        private userService: UsersService,
        private pruebasService: PruebasService,
        private currentPrueba: CurrentPruebaService,
        private alertController: AlertController,
        private menu: MenuController) {
        this.ronda = this.pruebasService.getRonda();
        this.scoreP = currentPrueba.getScore();
        this.jugadorP = currentPrueba.getCurrentUser();
        this.prueba = this.setPrueba();
        this.setSecondaryPlayers();

        this.pruebaType = this.pruebaTypeSetter();


    }

    ngOnInit() {
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
        console.log(this.jugadorP);
        console.log(this.jugadoresS);
    }

    setPlayersNotPlayed() {
        for (let i = 0; i < this.getUsers().length; i++) {
            this.userService.getUsersList()[i].havePlayed = false;
        }
    }

    navigate(routerLink) {
        if (this.userService.allUsersHavePlayed()) {
            this.presentAlert('/verdad-o-reto');
            this.pruebasService.rondas += 1;
            this.setPlayersNotPlayed();
        }
        else {
            this.router.navigate([routerLink], {replaceUrl: true});
            //Aqui va el metodo para pasar a la siguiente ronda.
        }
    }

    async presentAlert(routerLink) {
        let juv, jua, jur;
        juv = [];
        jua = [];
        jur = [];
        let cont = 0;
        let orderedList = this.userService.getUsersList().sort(function (a, b) {
            return b.score - a.score
        });

        for (let i = 0; i <= orderedList.length / 3; i++) {
            juv.push(orderedList[i]);
            cont++;
        }

        for (let j = cont; j <= 2 * cont; j++) {
            jua.push(orderedList[j]);
        }

        for (let k = 2 * cont; k <= orderedList.length; k++) {
            jur.push(orderedList[k]);
        }

        let subHeaderText = '';
        let listas = [juv, jua, jur];
        for (let x = 0; x < 3; x++) {
            let actualList = listas[x] as Users[];
            for (let p = 0; p < actualList.length; p++) {
                switch (x) {
                    case 0:
                        subHeaderText += actualList[p].name + '   0\n';
                        break;
                    case 1:
                        subHeaderText += actualList[p].name + '   1/2 vaso\n';
                        break;

                    case 2:
                        subHeaderText += actualList[p].name + '   1 vaso\n';
                        break;
                }
            }

        }


        const alert = await this.alertController.create({
            header: 'Toca beber chavales',
            subHeader: subHeaderText,
            buttons: [
                {

                    text: 'Ok',
                    handler: (blah) => {
                        this.router.navigate([routerLink]);
                    }
                }
            ]
        });

        await alert.present();
    }

}
