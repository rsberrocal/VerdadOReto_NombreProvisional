import {Component} from '@angular/core';
import {UsersService} from '../../core/services/users.service';
import {Users} from '../../shared/classes/users';
import {Router} from '@angular/router';
import {AlertController} from '@ionic/angular';


@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {

    users: Users[];

    constructor(
        private userService: UsersService,
        private router: Router,
        public alertController: AlertController
    ) {
    }

    ionViewWillEnter() {
        this.getUsers();
    }

    getUsers() {
        this.users = this.userService.getUsersList();
    }

    navigate(routerLink) {
        if (this.users.length >= 3) {
            this.router.navigate([routerLink]);
        } else {
            this.presentAlert();
        }
    }

    deleteUserEvent(event: Users) {
        this.userService.removeUser(event.name);
    }

    async presentAlert() {
        const alert = await this.alertController.create({
            header: 'ERES SUBNORMAL',
            subHeader: 'Necesitas almenos 3 participantes para jugar.',
            buttons: ['OK']
        });

        await alert.present();
    }
}
