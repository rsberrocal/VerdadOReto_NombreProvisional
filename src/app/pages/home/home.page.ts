import {Component} from '@angular/core';
import {UsersService} from '../../core/services/users.service';
import {Users} from '../../shared/classes/users';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {

    users: Users[];

    constructor(
        private userService: UsersService
    ) {
    }

    ionViewWillEnter() {
        this.getUsers();
    }

    getUsers() {
        this.users = this.userService.getUsersList();
        console.log(2);
    }

}
