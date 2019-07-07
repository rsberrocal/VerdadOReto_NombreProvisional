import {Component} from '@angular/core';

import {AlertController, MenuController, Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {Users} from './shared/classes/users';
import {UsersService} from './core/services/users.service';
import {Router, RouterLink} from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html'
})
export class AppComponent {
    users: Users[] = [];

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private menuController: MenuController,
        private userService: UsersService,
        private alertController: AlertController,

        private router: Router,


    ) {
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }

    disableMenu(event) {
        this.menuController.enable(false, 'ranking');
    }

    goTo(route){
        this.router.navigate([route]);
        this.menuController.close('start');
    }

    exit(){
        //navigator['app'].exitApp();
    }

    setRanking() {
        this.users = this.userService.getUsersList().sort(function (a, b) {
            return b.score - a.score
        });
    }
    resetGame(){
        for (let i = 0; i<this.users.length; i++) {
            this.users[i].score=0;
            this.userService.userList[i].score= 0;
        }
    }
    async presentAlert(routerLink) {
        const alert = await this.alertController.create({
            header: 'Salir',
            subHeader: 'Seguro que quieres salir de la partida?',


            buttons: [
                {

                    text: 'Reiniciar',
                    handler: (blah) => {
                        this.resetGame();
                        this.menuController.close('start');
                        this.router.navigate([routerLink]);
                    }
                }, {
                    text: 'Cancelar',
                    handler: () => {
                        console.log('Confirm Okay');
    }
                }
            ]
        });

        await alert.present();
    }
}
