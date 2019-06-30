import {Component} from '@angular/core';
import {UsersService} from '../../core/services/users.service';
import {Users} from '../../shared/classes/users';
import {Router} from '@angular/router';


@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {

    users: Users[];

    constructor(
        private userService: UsersService,
        private router: Router
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
        }
    }

}
