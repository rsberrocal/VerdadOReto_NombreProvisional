import {Component} from '@angular/core';

import {MenuController, Platform} from '@ionic/angular';
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
        private router: Router,
        private userService: UsersService
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
        this.users = this.userService.getUsersList();
    }
}
