import {Component} from '@angular/core';

import {AlertController, MenuController, Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {Users} from './shared/classes/users';
import {UsersService} from './core/services/users.service';
import {Router, Routes} from '@angular/router';

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
<<<<<<< HEAD
        private userService: UsersService,
        private alertController: AlertController
=======
        private router: Router,
        private userService: UsersService
>>>>>>> c76bd4d1d7aa9829a56b52b8faf4e24771b87f67
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
    async presentAlert(header: string, subHeader: string) {
        const alert = await this.alertController.create({
            header: header,
            subHeader: subHeader,
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: (blah) => {
                        console.log('Confirm Cancel: blah');
                    }
                }, {
                    text: 'Okay',
                    handler: () => {
                        console.log('Confirm Okay');
                    }
                }
            ]
        });

        await alert.present();
    }
}
