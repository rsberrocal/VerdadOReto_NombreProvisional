import {Component} from '@angular/core';

import {AlertController, MenuController, Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {Users} from './shared/classes/users';
import {UsersService} from './core/services/users.service';
import {Router} from '@angular/router';

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
        this.users = [];
        this.userService.userList = [];
    }
    async presentAlert() {
        const alert = await this.alertController.create({

            buttons: [
                {
                    text: 'Reiniciar',
                    handler: (blah) => {
                        this.resetGame();


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
